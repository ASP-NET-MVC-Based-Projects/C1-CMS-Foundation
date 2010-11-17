var Welcome = new function () {
	
	var TIME = 750;
	var setup = null;
	var clone = null;
	
	var hasSetup = false;
	var hasLanguages = false;
	var hasBlock = false;
	var hasLength = false;
	
	var tabindex = 0;
	
	/**
	 * @type {String}
	 */
	this.params = new String ( "" );
	
	/**
	 * Results are real. UI is fake ;)
	 */
	this.test = function () {
		
		EventBroadcaster.subscribe ( BroadcastMessages.KEY_TAB, this );
		EventBroadcaster.subscribe ( BroadcastMessages.KEY_ENTER, this );
		
		var ul = document.getElementById ( "introtest" );
		var lis = ul.getElementsByTagName ( "li" );
		var result = {};
		
		var response = new List ( SetupService.CheckRequirements ( true ));
		response.each ( function ( res ) {
			
			var li = document.createElement ( "li" );
			if ( !ul.hasChildNodes ()) {
				li.className = "on";
			}
			li.rel = res.Key;
			li.appendChild ( document.createTextNode ( res.Title ));
			ul.appendChild ( li );
			result [ res.Key ] = res.Success;
		})
		
		var i = 0;
		var isSuccess = true;
		
		setTimeout ( function () {
			doit ( result );
		}, TIME * 2 );
		
		function doit ( res ) {
			
			var li = lis.item ( i );
			var rel = li.rel;
			li.className += res [ rel ] ? " ok" : " bad";
			
			var is = res [ rel ];
			if ( !is ) {
				Welcome.params += ( Welcome.params.length > 0 ? ";" : "" ) + li.rel;
			}
			if ( isSuccess ) {
				isSuccess = is;
			}
			
			var next = lis.item ( i + 1 );
			if ( next != null ) {
				next.className = "on";
			}
			
			var wait = TIME * Math.random ();
			if ( i++ < lis.length - 1 ) {
				setTimeout ( function () {
					doit ( res );
				}, wait );
			} else {
				setTimeout ( function () {
					Welcome.result ( isSuccess );
				}, wait );
			}
		}
	}
	
	/**
	 * Test result.
	 */
	this.result = function ( isSuccess ) {
		
		var successtext = document.getElementById ( "introtestsuccess" );
		var failuretext = document.getElementById ( "introtestfailure" );
		
		var successbutton = bindingMap.introtestsuccessbutton;
		var failurebutton = bindingMap.introtestfailurebutton;
		
		if ( isSuccess ) {
			successtext.style.visibility = "visible";
			successbutton.getBindingElement ().style.visibility = "visible";
		} else {
			successtext.style.display = "none";
			failuretext.style.display = "block";
			successbutton.hide ();
			failurebutton.setURL ( failurebutton.getURL () + Welcome.params );
			failurebutton.show ();
		}
		
	}
	
	/**
	 * Switch to deck.
	 * @param {String} id
	 */
	this.switchTo = function ( id ) {
		
		switch ( id ) {
			
			case "test" :
				
				break;
				
			case "license" :
				var doc = SetupService.GetLicenseHtml ( true );
				var markup = DOMSerializer.serialize ( doc );
				document.getElementById ( "licensetext" ).innerHTML = markup;
				break;
			
			case "setup" :
				if ( !hasSetup ) {
					getSetup ();
					hasSetup = true;
				}
				break;
				
			case "language" :
				updateSetup ();
				if ( !hasLanguages ) {
					getLanguages ();
					hasLanguages = true;
				}
				prepareForm ( "languageform" );
				break;
				 
			case "login" :
				var form = document.getElementById ( "loginform" );
				prepareForm ( "loginform" );
				break;
		}
		
		relax ( true ) 
		bindingMap.introdecks.select ( id );
		bindingMap.navdecks.select ( "nav" + id );
		
		var p = document.getElementById ( "crumbs" );
		var spans = new List ( p.getElementsByTagName ( "span" ));
		spans.each ( function ( span ) {
			if ( span.id == "crumb" + id ) {
				span.className = "selected";
			} else {
				span.className = "";
			}
		});
		relax ( false );
	}
	
	function getLanguages () {
		
		var langs = new List ( SetupService.GetLanguages ( true ));
		var markup = "<select id=\"websitelanguage\">";
		langs.each ( function ( lang ) {
			markup += "<option value=\"" + lang.Key + "\"" + ( lang.Selected ? " selected=\"selected\"" : "" ) + ">" + lang.Title + "</option>";
		});
		markup += "</select>";
		
		var selector = document.getElementById ( "websitelanguage" );
		selector.parentNode.innerHTML = markup;
		
		markup = markup.replace ( "websitelanguage", "consolelanguage" );
		selector = document.getElementById ( "consolelanguage" );
		selector.parentNode.innerHTML = markup;
	}
	
	/**
	 * @param {String} id
	 */
	function prepareForm ( id ) {
		
		var form = document.getElementById ( id );
		var elements = new List ( form.elements );
		
		if ( !form.isPrepared ) {
			
			form.isPrepared = true;
			
			elements.each ( function ( element, index ) {
				
				element.onfocus = function () {
					
					window.standardEventHandler.enableNativeKeys ();
					
					tabindex = index;
					
					/*
					switch ( this.id ) {
						case "websitelanguage" :
							document.getElementById ( "websitehelp" ).style.display = "block";
							document.getElementById ( "consolehelp" ).style.display = "none";
							break;
						case "consolelanguage" :
							document.getElementById ( "websitehelp" ).style.display = "none";
							document.getElementById ( "consolehelp" ).style.display = "block";
							break;
					}
					*/
					
					if ( this.type == "text" || this.type == "password" ) {
						var input = this;
						setTimeout ( function () {
							if ( Client.isExplorer) {
								var range = input.createTextRange();
								range.moveStart ( "character", 0 );
								range.moveEnd ( "character", input.value.length );
								range.select ();
							} else {
						    	input.setSelectionRange ( 0, input.value.length );
							}
						}, 0 );
					}
				}
				
				element.onblur = function () {
					
					window.standardEventHandler.disableNativeKeys ();
					
					switch ( this.id ) {
						case "password" :
							if ( this.value != "" && this.value.length < 6 ) {
								badPassLength ( true );
							} else if ( hasLength ) {
								badPassLength ( false );
							}
							break;
						case "passcheck" :
							var password = document.getElementById ( "password" );
							if ( password.value != "" ) {
								if ( password.value != this.value ) {
									noneShallPass ( true );
								} else if ( hasBlock ) {
									noneShallPass ( false );
								}
							}
							break;
					}
				}
				
				if ( id == "loginform" ) {
					element.onkeyup = function () {	
						validate ();
					}
				}
			});
		}
		
		elements.get ( 0 ).focus ();
		
	}
	
	function validate () {
		
		var username = document.getElementById ( "username" );
		var password = document.getElementById ( "password" );
		var passcheck = document.getElementById ( "passcheck" );
		
		var isValid = false;
		
		if ( username.value != "" ) {
			if ( password.value.length >= 6 && passcheck.value.length >= 6 ) {
				if ( password.value == passcheck.value ) {
					isValid = true;
				}
			}
		}
		
		if ( isValid ) {
			bindingMap.startbutton.enable ();
			if ( hasBlock ) {
				noneShallPass ( false );
			}
		} else {
			bindingMap.startbutton.disable ();
		}
		
		return isValid;
	}
	
	/**
	 * @param {boolean} isBad
	 */
	function badPassLength ( isBad ) {
		
		if ( hasBlock ) {
			noneShallPass ( false );
		}
		
		var p = document.getElementById ( "lengthbad" );
		if ( isBad ) {
			p.style.display = "block";
		} else {
			p.style.display = "none";
		}		
		hasLength = isBad;
	}
	
	/**
	 * @param {boolean} isBlock
	 */
	function noneShallPass ( isBlock ) {
		
		if ( hasLength ) {
			badPassLength ( false );
		}	
		
		var p = document.getElementById ( "loginbad" );
		if ( isBlock ) {
			p.style.display = "block";
		} else {
			p.style.display = "none";
		}
		hasBlock = isBlock;
	}
	
	/**
	 * @implements {IBroadcastListener}
	 * @param {String} broadcast
	 */
	this.handleBroadcast = function ( broadcast ) {
		
		var decks = bindingMap.introdecks;
		var deck = decks.getSelectedDeckBinding ();
		var id = deck.getID ()
		
		if ( id == "language" || id == "login" ) {
		
			switch ( broadcast ) {
				
				case BroadcastMessages.KEY_TAB :
					
					var form = document.getElementById ( id + "form" );
					var elements = form.elements;
					
					var index = 0;
					
					if ( Keyboard.isShiftPressed ) {
						if ( tabindex == 0 ) {
							index = elements.length - 1;
						} else {
							index = -- tabindex;
						}
					} else {
						if ( tabindex != elements.length - 1 ) {
							index = ++ tabindex ; 
						}
					}
					elements [ index ].focus ();
					tabindex = index;
					break;
					
				case BroadcastMessages.KEY_ENTER :
					if ( id == "login" ) {
						if ( validate ()) {
							this.login ();
						}
					}
					break;
			}
		}
	}
	
	/**
	 * Mount setup options.
	 */
	function getSetup () {
		
		var transformer = new XSLTransformer ();
		transformer.importStylesheet ( "${root}/welcome.xsl" );
		
		setup = SetupService.GetSetupDescription ( true );
		var html = transformer.transformToString ( setup, true );
		
		var target = document.getElementById ( "setuptext" );
		target.innerHTML = setup.documentElement.getAttribute ( "desc" );
		
		target = document.getElementById ( "setupfields" );
		target.innerHTML = html.replace ( /xmlns:ui=\"urn:HACKED\"/g, "" );
		DocumentManager.attachBindings ( target );
	}
	
	function updateSetup () {
		
		// reset setup result
		if ( Client.isWebKit ) { // huh? Cannot clone document node?
			var xml = DOMSerializer.serialize ( setup );
			clone = XMLParser.parse ( xml );
		} else {
			clone = setup.cloneNode ( true );
		}
		
		var keys = {};
		var radios = new List ();
		var elements = new List ( clone.getElementsByTagName ( "*" ));
		
		elements.each ( function ( element ) { // IE no speak getElementsByTagName ( "radio" )!
			if ( element.nodeName == "radio" ) {
				radios.add ( element );
			}
		});
		
		radios.each ( function ( radio ) {
			radio.removeAttribute ( "selected" );
			keys [ radio.getAttribute ( "key" )] = radio;
		});
		
		var target = document.getElementById ( "setupfields" );
		var groups = new List ( target.getElementsByTagName ( Client.isExplorer ? "radiodatagroup" : "ui:radiodatagroup" ));
		
		// update setup result
		groups.each ( function ( group ) {
			group = UserInterface.getBinding ( group );
			var key = group.getValue ();
			var radio = keys [ key ];
			radio.setAttribute ( "selected", "true" );
		});
		
		// remove unselected elements
		radios.each ( function ( radio ) {
			if ( radio.getAttribute ( "selected" ) == null ) {
				radio.parentNode.removeChild ( radio );
			} else {
				radio.removeAttribute ( "selected" );
			}
		});
	}
	
	/**
	 * Relax layout while we check if new content should expand the box...
	 * @param {boolean} isRelaxed
	 */
	function relax ( isRelaxed ) {

		if ( !Client.isWebKit ) { // somehow fails in webkit
		
			var table = document.getElementById ( "intro" );
			var c = table.getElementsByTagName ( "td" ).item ( 4 );
	
			if ( isRelaxed ) {
				c.setAttribute ( "_height", c.offsetHeight ); 
				c.style.height = "auto";
			} else {
				var h = c.getAttribute ( "_height" );
				if ( c.offsetHeight < parseInt ( h )) {
					c.style.height = h + "px";
				}
			}
		}
	}
	
	this.update = function ( binding ) {
		
		switch ( binding.constructor ) {
			case RadioDataBinding :
				updateRadio ( binding );
				break;
		}
	}
	
	function updateRadio ( binding ) {
		
		var parent = binding.bindingElement.parentNode;
		var group = UserInterface.getBinding ( parent );
		var radios = group.getChildBindingsByLocalName ( "radio" );
		
		setTimeout ( function () {
			radios.each ( function ( radio ) {
				var id = "div" + radio.getProperty ( "value" );
				var div = document.getElementById ( id );
				if ( div != null ) {
					if ( radio.isChecked ) {
						CSSUtil.attachClassName ( div, "visible" );
					} else {
						CSSUtil.detachClassName ( div, "visible" );
					}
				}
			});
		}, 0 );
	}
	
	/**
	 * @param {HTMLInputElement} input
	 */
	this.acceptLicense = function ( input ) {
		
		var button = bindingMap.setupbutton;
		if ( input.checked ) {
			button.enable ();
		} else {
			button.disable ();
		}
	}
	
	/**
	 * Login!
	 */
	this.login = function () {
		
		var serial = DOMSerializer.serialize ( clone );
		
		var username = document.getElementById ( "username" ).value;
		var password = document.getElementById ( "password" ).value;
		
		var select = document.getElementById ( "websitelanguage" );
		var websitelanguage = select.options [ select.selectedIndex ].value;
		
		select = document.getElementById ( "consolelanguage" );
		var consolelanguage = select.options [ select.selectedIndex ].value;
		
		top.bindingMap.offlinetheatre.play ();
		if ( Client.isExplorer ) {
			top.bindingMap.introcover.show ();
		} else {
			CoverBinding.fadeIn ( top.bindingMap.introcover );
		}
		
		setTimeout ( function () {
			
			/*
			alert ( serial ); 	
			alert ( username + "\n" + password + "\n" + websitelanguage + "\n" + consolelanguage );
			*/
			
			if ( SetupService.SetUp ( serial, username, password, websitelanguage, consolelanguage )) {
				Application.reload ( true );
			} else {
				top.bindingMap.introcover.hide ();
				top.bindingMap.offlinetheatre.stop ();
				alert ( "An unfortunate error has occured." );
			}
		}, Client.isExplorer ? 0 : 500 );
	}
}