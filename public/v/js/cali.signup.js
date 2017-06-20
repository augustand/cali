$(document).ready(function(){
    var app = new Vue({
        i18n,
        el: "#root",
        data: {
            loginName:"",
            loginPassword:"",
            repeatLoginPassword:""
        },
        methods: {
            regist:function () {
                if (this.tipinfo != ""){
                    alert("please enter correct info");
                    return;
                }
                var form = commonData();
                form.append("loginName",app.loginName);
                form.append("loginPassword",app.loginPassword);
                fetch('/api/user/regist',{method:'post',body:form}).then(function(response) {
                    if (response.redirected){
                        window.location.href = response.url;
                    }
                    return response.json();
                }).then(function(json) {
                    if (json.statusCode ==200){
                        alert(json.message);
                        window.location = "/login"
                    }else {
                        alert(json.message);
                    }
                }).
                catch(function(ex) {
                    console.log('parsing failed', ex)
                });
            }
        },
        computed: {
            tipinfo:function () {
                if (this.loginName == ""){
                    return "lang.peln"
                }
                if (this.loginPassword == ""){
                    return "lang.pelp"
                }
                if (this.loginPassword != this.repeatLoginPassword){
                    return "lang.pcp"
                }
                return ""
            }
        },
        created: function() {
            //console.log("created");
            if (!_.isUndefined(store.get("session")) && !_.isUndefined(store.get("user"))){
                window.location = "/"
            }
        },
        beforeMount: function () {
            //console.log("beforeMount");
        },
        mounted: function () {
            //console.log("mounted");
        }
    });
});