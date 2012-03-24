jQuery.widget("custom.awesomeForm", (function($) {
  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  
  function humanize(string) {
    return capitalize(string).replace(/[-_\s]+(\w)/, function(m,c) {
      return " "+c.toUpperCase();
    });
  }


  var Builder = function(domContext, data) {
    this.domContext = domContext;
    this.data = data;
    this.contents = [];
  };
  
  Builder.validTypes = ["enum","hidden","list","string"]
  
  Builder.prototype = {
    buildField: function(name, type, options, inputBuilder) {
      if(Builder.validTypes.indexOf(type) < 0) {
        throw "Invalid field type `"+type+"' ("+Builder.validTypes.join(', ')+")";
      }
      if(!$.isPlainObject(options)) {
        throw "Must supply an Object for options";
      }
      if(!$.isFunction(inputBuilder)) {
        throw "Must supply input field builder";
      }
      
      var fieldValue = options.data || this.data[name];
      if(typeof fieldValue === "undefined" || fieldValue === null) {
        if(!name) {
          fieldValue = this.data || '';
        } else {
          fieldValue = '';
        }
      }
      
      var cssClasses = ["field"];
      if(options.cssClass) {
        cssClasses.push(options.cssClass);
      }
      name = name ? 'data-af-name="'+name+'" ' : ''
      
      var field = ''+
       '<div class="'+cssClasses.join(' ')+'" '+name+
        'data-af-type="'+type+'">'+
         inputBuilder.call(this, fieldValue)+
       '</div><!-- /.field:'+name+' -->';
      
      this.concat(field);
    },
    
    buildLabelledField: function(name, type, options, inputBuilder) {
      options = options || {};
      
      var label = '';
      if(name) {
        label = '<label>'+(options.label || humanize(name))+'</label>';
      }
      return this.buildField(name, type, options, function() {
        return ''+
         label+
         inputBuilder.apply(this, Array.prototype.slice.call(arguments));
      });
    },
    
    buildHiddenField: function(name, options) {
      this.buildField(name, "hidden", options || {}, function(fieldValue) {
        return '<input type="hidden" value="'+fieldValue+'" />'
      });
    },
    
    buildSelectField: function(name, options) {
      options = options || {};
      var optionsForSelect = options["options"];
      
      return this.buildLabelledField(name, "enum", options, function(fieldValue) {
        var optionsHtml = '<select>';
        
        $.each(optionsForSelect, (function(that) {
          return function(value, displayName) {
            var selected = fieldValue == value ? ' selected="selected"' : '';
            optionsHtml += ''+
              '<option value="'+value+'"'+selected+'>'+displayName+'</option>';
          };
        })(this));
        
        optionsHtml += '</select>';
        
        return optionsHtml;
      });
    },
    
    buildTextArea: function(name, options) {
      return this.buildLabelledField(name, "string", options, function(value) {
        if(!name && $.isPlainObject(value)) {
          value = '';
        }
        return '<textarea>'+value+'</textarea>';
      });
    },
    
    buildTextField: function(name, options) {
      return this.buildLabelledField(name, "string", options, function(value) {
        if(!name && $.isPlainObject(value)) {
          value = '';
        }
        return '<input type="text" value="'+value+'" />';
      });
    },
    
    buildFormList: function(name, options) {
      options = options || {};
      return this.buildField(name, "list", options, function(listData) {
        var formListHtml = '';

        var factory = (function(that) {
          var builder = new Builder(that.domContext, {});
          var contents = builder.result(options.builder);
          formListHtml += ''+
           '<div class="af-factory" style="display:none;">'+
             contents+
           '</div>';
        })(this);
        
        formListHtml += '<ol>';
        
        $.each(listData, (function(that) {
          return function(index, data) {
            var builder = new Builder(that.domContext, data);
            formListHtml += ''+
             '<li data-af-index="'+index+'">'+
               builder.result(options.builder)+
             '</li>';
          };
        })(this));
        
        formListHtml += '</ol>';
        formListHtml += '<a href="#add" class="af-add">Add</a>';
        
        return formListHtml;
      });
    },
    
    buildRemoveButton: function() {
      this.concat('<a href="#remove" class="af-remove">Remove</a>');
    },
    
    buildTypeSelectable: function(nameValues, options) {
      options = options || {};
      var typeName = this.data[options.typeName || 'type'];
      
      $.each(nameValues || {}, (function(that) {
        return function(name, callback) {
          var cssClass = ['af-type-selectable'];
          if(name == typeName) {
            cssClass.push(['af-selected']);
          }
          that.concat.call(that, ''+
           '<div class="'+cssClass.join(' ')+'" '+
            'data-af-type="'+name+'">');
          that.eval.call(that, callback);
          that.concat.call(that, '</div>');
        };
      })(this));
    },
    
    propertiesFor: function(name, callback) {
      var binding = new Builder(this.domContext, this.data[name]);
      
      this.concat('<div class="af-properties-for" data-af-name="'+name+'">');
      this.concat(binding.result(callback));
      this.concat('</div>');
    },
    
    concat: function(string) {
      this.contents.push(string);
    },
    
    eval: function(builder) {
      var result = builder.call(this, this.data);
      if(result === false) {
        throw "Builder function return false";
      }
    },
    
    result: function(builder) {
      if($.isFunction(builder)) {
        this.eval(builder);
      }
      return this.contents.join('');
    }
  };
  
  
  //
  // Serialize magic!
  var serialize = function(elements) {
    var workQueue = [];
    
    $.each(elements, function(index, element) {
      workQueue.push({
        element: element
      });
    });
    
    do {
      var entry = workQueue.shift();
      var element = $(entry.element);
    
      if(element.is(".af-type-selectable:not(.af-selected)")) {
        continue;
      }

      if(element.is("div.field")) {
        var name = element.attr("data-af-name");
        var type = element.attr("data-af-type");
        
        var namePrefix = [];
        if(entry.namePrefix) {
          namePrefix.push(entry.namePrefix);
        }

        if(type == "list") {
          element.find("> ol > li").each(function(index, listElement) {
            var indexedName = name+'['+index+']';
            namePrefix.push(indexedName);
            workQueue.push({
              element: listElement,
              namePrefix: namePrefix.join('.')
            })
            namePrefix.pop();
          });
        } else {
          if(name) {
            namePrefix.push(name);
          }
          namePrefix = namePrefix.join('.');
          element.find("input, select, textarea").each(function(index, inputElement) {
            $(inputElement).attr("name", namePrefix);
          });
        }
      } else {
        element.children().each(function(index, childElement) {
          workQueue.push({
            element: childElement,
            namePrefix: entry.namePrefix
          });
        });
      }
    } while(workQueue.length > 0);
  };
  
  
  return {
    options: {
      formElementClass: "awesome-form",
      data: []
    },
    
    _create: function() {
      if(!this.element.is("form")) {
        throw "Must call on a <form> element";
      }
      this.element.addClass(this.options.formElementClass);
      
      this.delegateEvents();
      this.build();
    },
    
    build: function() {
      // Instantiate a Builder that we'll use to compose the view
      var builder = new Builder(this.element, this.options.data);
      this.element.html(builder.result(this.options.builder));
    },
    
    delegateEvents: function() {
      // User generated events
      this.element.delegate(".af-remove", "click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        var trigger = $(event.target);
        var li = trigger.closest("[data-af-index]");
        li.nextAll().each(function(index, nextSibling) {
          var nextLi = $(nextSibling);
          var newIndex = parseInt(nextLi.attr("data-af-index"), 10) - 1;
          nextLi.attr("data-af-index", newIndex);
          
          //nextLi.trigger("custom.af.serialize");
        });
        li.remove();
      });
      
      this.element.delegate(".af-add", "click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        var trigger = $(event.target);
        var ol = trigger.siblings("ol");
        var lastLi = ol.children(":last-child");
        var newIndex = 0;
        
        if(lastLi.size() > 0) {
          newIndex = parseInt(lastLi.attr("data-af-index"), 10) + 1;
        }
        
        var li = $(''+
         '<li data-af-index="'+newIndex+'">'+
           trigger.siblings(".af-factory").html()+
         '</li>');
        
        ol.append(li);
        
        //li.trigger("custom.af.serialize");
      });
      
      this.element.delegate(".af-type-selector", "change", function(event) {
        var trigger = $(event.target);
        if(!trigger.is('select, input[type="radio"]')) {
          return;
        }
        event.stopPropagation();
        
        var field = $(event.currentTarget);
        field.siblings(".af-type-selectable").each(function(index, selectable) {
          selectable = $(selectable);
          if(selectable.attr("data-af-type") == trigger.val()) {
            selectable.show().addClass("af-selected");
          } else {
            selectable.hide().removeClass("af-selected");
          }
        });
      });
      
      this.element.bind("submit", function(event) {
        $(event.target).trigger("custom.af.serialize");
      });
      
      // Custom DOM events
      (function(that) {
        that.element.bind("custom.af.serialize", function(event) {
          event.stopPropagation();
          
          var root = $(event.target);
          serialize.call(that, root);
        });
      })(this);
    }
  };
})(jQuery));