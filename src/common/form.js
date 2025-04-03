export default {
	name:'form',
    checkFlag:false,
	initalize:function(vue) {
		this.Vue = vue;
	},
	validate: function($f,event,callBack) {

			event.preventDefault();

			if(this.checkFlag)return;

			var submitFlag = true;
			var postParams = {};
			var obj = this;
			var funcs = new Array();
			funcs['domain'] = this.isValidDomain;
			funcs['email'] = this.isValidEmail;
			funcs['userid'] = this.isValidUserid;
			funcs['userpw'] = this.isValidUserpw;
			funcs['hangul'] = this.hasHangul;
			funcs['number'] = this.isNumeric;
			funcs['engonly'] = this.alphaOnly;
			funcs['normal'] = this.isSpecialCharacter;

			$($f.serializeArray()).each(function(k,f) {
				var $el = $('#'+f.name); 
				if(!$el.val() && $el.attr('required')) {
					$el.focus();
					$el.parent().parent('.form-group').addClass('md-invalid');
					$el.off('keyup');
					$el.on('keyup',function() {
						if($(this).val()) {
							$(this).parent().parent('.form-group').removeClass('md-invalid');
						}
					});
					submitFlag = false;
					return false;
				} else {
					if($el.attr('option')) {
						var checkFunc = funcs[$el.attr('option')];
						if(!checkFunc($el.val())) {
							$el.focus();
							$el.parent().parent('.form-group').addClass('md-warning-invalid');
							$el.off('keyup');
							$el.on('keyup',function() {
								$(this).parent().parent('.form-group').removeClass('md-warning-invalid');
								
							});
							submitFlag = false;
							return false;
						}
					} 
					if($el.attr('match')) {
						
						if($el.val()!=$($el.attr('match')).val()) {
							$el.val('');
							$el.focus();
							$el.parent().parent('.form-group').addClass('md-warning-invalid');
							$el.off('keyup');
							$el.on('keyup',function() {
								$(this).parent().parent('.form-group').removeClass('md-warning-invalid');
								
							});
							submitFlag = false;
							return false;
						}
					}

				}
				postParams[f.name] = $el.val();
			});
			if(submitFlag) {
				if(!$f.attr('action'))return true;
				//console.log('------>',JSON.stringify(postParams));
				this.sendPost(postParams,$f.attr('action'),callBack);
			} else  return false;
	},
	validateOnly: function($f) {
			
			var submitFlag;
			var postParams = {};
			var obj = this;
			var funcs = new Array();
			funcs['domain'] = this.isValidDomain;
			funcs['email'] = this.isValidEmail;
			funcs['userid'] = this.isValidUserid;
			funcs['userpw'] = this.isValidUserpw;
			funcs['hangul'] = this.hasHangul;
			funcs['number'] = this.isNumeric;
			funcs['engonly'] = this.alphaOnly;
			funcs['normal'] = this.isSpecialCharacter;

			$($f.serializeArray()).each(function(k,f) {
				var $el = $('#'+f.name); 
				if(!$el.val() && $el.attr('required')) {
					$el.focus();
					$el.parent().parent('.form-group').addClass('md-invalid');
					$el.off('keyup');
					$el.on('keyup',function() {
						if($(this).val()) {
							$(this).parent().parent('.form-group').removeClass('md-invalid');
						}
					});
					submitFlag = false;
					return false;
				} else {
					if($el.attr('option')) {
						var checkFunc = funcs[$el.attr('option')];
						if(!checkFunc($el.val())) {
							$el.focus();
							$el.parent().parent('.form-group').addClass('md-warning-invalid');
							$el.off('keyup');
							$el.on('keyup',function() {
								$(this).parent().parent('.form-group').removeClass('md-warning-invalid');
								
							});
							submitFlag = false;
							return false;
						}
					} 
					if($el.attr('match')) {
						
						if($el.val()!=$($el.attr('match')).val()) {
							$el.val('');
							$el.focus();
							$el.parent().parent('.form-group').addClass('md-warning-invalid');
							$el.off('keyup');
							$el.on('keyup',function() {
								$(this).parent().parent('.form-group').removeClass('md-warning-invalid');
								
							});
							submitFlag = false;
							return false;
						}
					}

				}
				postParams[f.name] = $el.val();
			});
			return postParams;

	},
	number_format: function(number) {
		var nf = new Intl.NumberFormat(["en-US"], {
		
		});
		return nf.format(number);
	},
	sendPost: function(params,action,callBack) {
		var thisObj = this.Vue;
		this.checkFlag = true;
		var obj = this;
		var url = this.getServerUrl();
		if(thisObj.$VARS.debug) {
			params.return_script_type = 'jsonp';
			$.ajax({url:url+action,
					data:params,
					dataType:'jsonp',
				    jsonpCallback: thisObj.$VARS.callBack,
					success:function (response) {
					    obj.checkFlag = false;
						if(callBack) {
							eval(callBack(response));
						}
					},
					error:function(request,status,error){
						obj.checkFlag = false;
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
			})

		} else {
			
			$.ajax({url:url+action,
					data:params,
					headers: {
					   "authKey":thisObj.$VARS.authKey,
						"lang":localStorage.getItem('lang'),
					},
				    dataType:'json',
					type:'post',
					success:function (response) {
					    obj.checkFlag = false;
						if(callBack) {
							eval(callBack(response));
						}
					},
					error:function(request,status,error){
						obj.checkFlag = false;
						alert("인터넷 연결을 확인해주세요");
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
			})
		}
	},
	getServerData: function(params,action,callBack) {
		var thisObj = this.Vue;
		var obj = this;
		var url = this.getServerUrl();
		if(thisObj.$VARS.debug) {
			params.return_script_type = 'jsonp';
			$.ajax({url:url+action,
					data:params,
					dataType:'jsonp',
				    jsonpCallback: thisObj.$VARS.callBack,
					success:function (response) {
						//console.log(response);
						if(callBack) {
							eval(callBack(response));
						}
					},
					error:function(request,status,error){
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
			})

		} else {
			$.ajax({url:url+action,
					data:params,
					headers: {
					   "authKey":thisObj.$VARS.authKey,
						"lang":localStorage.getItem('lang'),
					},
					dataType:'json',
					type:'post',
					success:function (response) {
						//console.log(response);
						if(callBack) {
							eval(callBack(response));
						}
					},
					error:function(request,status,error){
						alert("인터넷 연결을 확인해주세요");
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
			})
		}
	},
	getServerUrl: function() {
		return this.Vue.$VARS.baseUrl;
		
	},
	isValidDomain: function(value) {
		var pattern = /^[_a-zA-Z가-힝0-9-]+\.[a-zA-Z가-힝0-9-\.]+[a-zA-Z]+(\/[a-zA-z0-9-\/\.]{0,})*$/;
		return (pattern.test(value.replace(/http:\/\//g, ''))) ? true : false;
	},
	isValidEmail: function(value) {
		var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
		return (pattern.test(value)) ? true : false;
	},
	isValidUserid: function(value) { 
		var pattern = /^[a-z]{1}[a-z0-9]{3,14}$/;
		return (pattern.test(value)) ? true : false;
	},
	isValidUserpw: function(value) { 
		if(value.length<8 || value.length>15)return false;
		var pattern = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/
		return (pattern.test(value)) ? true : false;
	},
	hasHangul: function(value) {
		var pattern = /[가-힝]/;
		return (pattern.test(value)) ? true : false;
	},
	alphaOnly: function(value) {
		var pattern = /^[a-zA-Z]+$/;
		return (pattern.test(value)) ? true : false;
	},
	isSpecialCharacter: function(value) {
		var pattern = /[a-zA-Z가-힝0-9]/;
		return (pattern.test(value)) ? true : false;
	},
	isNumeric: function(value) {
		var pattern = /^[0-9]+$/;
		return (pattern.test(value)) ? true : false;
	}
}

