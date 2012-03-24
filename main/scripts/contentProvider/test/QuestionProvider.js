$(document).ready(function()
{
    ContentProvider.prototype = new BaseProvider();
    ContentProvider.prototype.constructor = ContentProvider;
    materialProvider = new ContentProvider();

	document.execCommand("enableObjectResizing", false, 'false');
	$('#content h1')[0].contentEditable = false;
    
	questionBlueprints.getQuestionJSON();
	
    // The reason this is in a $.each is in case we ever decide to 
    // have multiple question Blueprints in a single editor
	var blueprintCounter = 0; 
	$.each(questionBlueprints.questionJSON, function(index, value)
	{
		questionEditor = new QuestionEditor($(''),value);
		blueprintCounter++;
	});
    
    testFunction();
    
    MathJax.Hub.Config(
	{
		extensions: ["tex2jax.js","TeX/bbox.js"]
	})
	
	baseContent.refreshILOs();
	$('.ilo').attr('contenteditable',false);
	
	$('#questionEditorViewer').tabs();
});

function testFunction()
{
    var fixture = questionBlueprints.questionJSON['question101'][5][1];
    
    var paramblueprintBuilder = function(data) {
      this.buildTextField("name");

      this.buildSelectField("type", {
        options: {
          "enum": "Enumerable",
          "function": "Function",
          "integer": "Number"
        },
        
        cssClass: "af-type-selector"
      });
      
      this.buildTypeSelectable({
        "enum": function() {
          this.buildFormList("values", {
            builder: function(data) {
              this.buildTextField();
              this.buildRemoveButton();
            }
          });
        },
        "function": function() {
          this.buildFormList("include", {
            builder: function(data) {
              this.buildTextField();
              this.buildRemoveButton();
            }
          });
        },
        "integer": function() {
          this.buildTextField("lowerbound");
          this.buildTextField("upperbound");
        }
      });
      
      this.concat("<div>");
      this.buildRemoveButton();
      this.concat("</div>");
    };

    $("#awesome-form-test").awesomeForm({
      data: fixture,
      
      builder: function(data) {
        this.buildSelectField("type", {
          options: {
            "Equation Multiple Choice": "Equation Multiple Choice"
          }
        });
        
        this.concat('<fieldset><legend>Contents</legend>');
          this.buildTextArea('content', {
            cssClass: 'full'
          });
        this.concat('</fieldset>');
        
        this.concat(''+
          '<div id="submit-button">'+
            '<input type="submit" value="Submit" />'+
          '</div>');
        
        this.concat('<fieldset><legend>Parameters</legend>');
          this.buildFormList("paramblueprint", {
            builder: paramblueprintBuilder
          });
        this.concat('</fieldset>');

        this.concat('<fieldset><legend>Answer Parameters</legend>');
          this.buildFormList("answerfieldparamblueprint", {
            builder: paramblueprintBuilder
          });
        this.concat('</fieldset>');
        
        this.concat('<fieldset><legend>ILOContents</legend>');
          this.buildFormList('ILOContents', {
            builder: function(data) {
              this.buildTextField("index");
              this.buildTextField("value");
            }
          });
        this.concat('</fieldset>');
        
        this.concat('<fieldset><legend>Correct answer</legend>');
          this.buildTextArea('correctanswer', {
            cssClass: 'full'
          });
        this.concat('</fieldset>');
        
        this.concat('<fieldset><legend>Answer fields</legend>');
          this.propertiesFor('answerfieldblueprint', function() {
            this.propertiesFor('attributes', function() {
              this.buildSelectField('type', {
                options: {
                  multiplechoice: "Multiple Choice"
                },
                cssClass: "af-type-selector"
              });
              
              this.buildTypeSelectable({
                "multiplechoice": function() {
                  this.buildTextField("numanswers");
                }
              });
            });
          });
        this.concat('</fieldset>');
      }
    });

    /* Test code */
    $("#awesome-form-test").submit(function(event) {
      event.preventDefault();
      
      var asJson = ppJSON($("#awesome-form-test").getJSON());
      $("#test-output").text(asJson);
    }).trigger("submit");
}