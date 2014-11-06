/*
 * Copyright 2010 akquinet
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *  This JQuery Plugin will help you in showing some nice Toast-Message like notification messages. The behavior is
 *  similar to the android Toast class.
 *  You have 4 different toast types you can show. Each type comes with its own icon and colored border. The types are:
 *  - notice
 *  - success
 *  - warning
 *  - error
 *
 *  The following methods will display a toast message:
 *
 *   $().toastmessage('showNoticeToast', 'some message here');
 *   $().toastmessage('showSuccessToast', "some message here");
 *   $().toastmessage('showWarningToast', "some message here");
 *   $().toastmessage('showErrorToast', "some message here");
 *
 *   // user configured toastmessage:
 *   $().toastmessage('showToast', {
 *      text     : 'Hello World',
 *      sticky   : true,
 *      position : 'top-right',
 *      type     : 'success',
 *      close    : function () {console.log("toast is closed ...");}
 *   });
 *
 *   To see some more examples please have a look into the Tests in src/test/javascript/ToastmessageTest.js
 *
 *   For further style configuration please see corresponding css file: jquery-toastmessage.css
 *
 *   This plugin is based on the jquery-notice (http://sandbox.timbenniks.com/projects/jquery-notice/)
 *   but is enhanced in several ways:
 *
 *   configurable positioning
 *   convenience methods for different message types
 *   callback functionality when closing the toast
 *   included some nice free icons
 *   reimplemented to follow jquery plugin good practices rules
 *
 *   Author: Daniel Bremer-Tonn
**/

(function($)
{
        var settings = {
            inEffect: {opacity: 'show'},
            inEffectDuration: 600,
            stayTime: 3000,
            text: '',
            sticky: false,
            type: 'notice',
            position: 'top-right',
            closeText: '',
            close: null
        };

    var methods = {
        init : function(options)
                {
                        if (options) {
                $.extend( settings, options );
            }
                },

        showToast : function(options)
                {
                        var localSettings = {};
            $.extend(localSettings, settings, options);

                        // declare variables
            var toastWrapAll, toastItemOuter, toastItemInner, toastItemClose, toastItemImage;

                        toastWrapAll    = (!$('.toast-container').length) ? $('<div></div>').addClass('toast-container').addClass('toast-position-' + localSettings.position).appendTo('body') : $('.toast-container');
                        toastItemOuter  = $('<div></div>').addClass('toast-item-wrapper');
                        toastItemInner  = $('<div></div>').hide().addClass('toast-item toast-type-' + localSettings.type).appendTo(toastWrapAll).html($('<p>').append (localSettings.text)).animate(localSettings.inEffect, localSettings.inEffectDuration).wrap(toastItemOuter);
                        toastItemClose  = $('<div></div>').addClass('toast-item-close').prependTo(toastItemInner).html(localSettings.closeText).click(function() { $().toastmessage('removeToast',toastItemInner, localSettings) });
                        toastItemImage  = $('<div></div>').addClass('toast-item-image').addClass('toast-item-image-' + localSettings.type).prependTo(toastItemInner);

            if(navigator.userAgent.match(/MSIE 6/i))
                        {
                        toastWrapAll.css({top: document.documentElement.scrollTop});
                    }

                        if(!localSettings.sticky)
                        {
                                setTimeout(function()
                                {
                                        $().toastmessage('removeToast', toastItemInner, localSettings);
                                },
                                localSettings.stayTime);
                        }
            return toastItemInner;
                },

        showNoticeToast : function (message)
        {
            var options = {text : message, type : 'notice'};
            return $().toastmessage('showToast', options);
        },

        showSuccessToast : function (message)
        {
            var options = {text : message, type : 'success'};
            return $().toastmessage('showToast', options);
        },

        showErrorToast : function (message)
        {
            var options = {text : message, type : 'error'};
            return $().toastmessage('showToast', options);
        },

        showWarningToast : function (message)
        {
            var options = {text : message, type : 'warning'};
            return $().toastmessage('showToast', options);
        },

                removeToast: function(obj, options)
                {
                        obj.animate({opacity: '0'}, 600, function()
                        {
                                obj.parent().animate({height: '0px'}, 300, function()
                                {
                                        obj.parent().remove();
                                });
                        });
            if (options && options.close !== null)
            {
                options.close();
            }
                }
        };

    $.fn.toastmessage = function( method ) {

        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.toastmessage' );
        }
    };

})(jQuery);


function showNoticeToast() {
    $().toastmessage('showNoticeToast', "Есть неназначенные заявки!");
}

function showStickyNoticeToast() {
    $().toastmessage('showToast', {
         text     : 'Внимание!<br>Есть неназначенные заявки!',
         sticky   : true,
         position : 'middle-right',
         type     : 'notice',
         closeText: '',
         close    : function () {}
    });
}
