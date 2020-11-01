

var markdown_note_new = function() {

  // use module pattern (see JavaScript - The Good Parts)

  var _converter = new Showdown.converter();

  function markdown( text, onsuccess )
  {
    // todo: get version from code possible? how?

    var banner_begin = "<!-- === begin markdown block ===\n" +
          "\n" +
          "   generated by Showdown on " + navigator.userAgent + "\n" +
          "     on " + new Date().toString() + "\n" +  
          "-->\n\n";

    var banner_end = "\n\n<!-- === end markdown block === -->";

    var html = _converter.makeHtml( text );

    onsuccess( banner_begin + html + banner_end );
  }


    var $input,
        $input_toggle,
        $output,
        $output_source,
        $output_update,
        $output_toggle;

    var show_html = false;
    var use_white_color_theme = false;

    var welcome =
      "Welcome to Markdown. We hope you **really** enjoy using this." +
      "\n\n" +
      "Just type some [markdown](http://daringfireball.net/projects/markdown) on the left and see it on the right. *Simple as that.*";

    var settings = {
     welcome: welcome,
     input_toggle: {
       label_black: '[ Use Black Color Theme]',
       label_white: '[ Use White Color Theme]'
     },
     output_toggle: {
       label_show: '[ Show HTML ]',
       label_hide: '[ Hide HTML ]'
     }
    };


    function toggle_output()
    {
      show_html = !show_html;

      if( show_html ) {
        $output_toggle.innerHTML = settings.output_toggle.label_hide;
        $output.style.display = 'none';         // hide()
        $output_source.style.display = 'block'; // show()
      }
      else {
        $output_toggle.innerHTML = settings.output_toggle.label_show;
        $output.style.display = 'block';       // show()
        $output_source.style.display = 'none'; // hide()
      }
    }


    function _toggle_color_theme()
    {
      use_white_color_theme = !use_white_color_theme;

      if( use_white_color_theme ) {
        $input.classList.remove( 'black' );
        $input_toggle.innerHTML = settings.input_toggle.label_black;
      }
      else {
        $input.classList.add( 'black' );
        $input_toggle.innerHTML = settings.input_toggle.label_white;
      }
    }

    function update_output()
    {
      var text = $input.value;  // get markdown text

      markdown( text, function( html ) {
         $output.innerHTML        = html;
         $output_source.innerHTML = html;
      });
    }


   function _init()
   {
     $input          = document.getElementById( 'note' );          // textarea for markdown source );
     $input_toggle   = document.getElementById( 'input-toggle' );

     $output         = document.getElementById( 'output' );
     $output_source  = document.getElementById( 'output-source' );
     $output_update  = document.getElementById( 'output-update' );   // a/link for update action
     $output_toggle  = document.getElementById( 'output-toggle' );

     $input_toggle.addEventListener( 'click', _toggle_color_theme, false);

     $output_update.addEventListener( 'click', update_output, false);
     $output_toggle.addEventListener( 'click', toggle_output, false);

     $input.value = settings.welcome;
     update_output();
   }

   _init();
   
    return {
      update: update_output,
      toggle: toggle_output
    }
} // fn markdown_note_new
