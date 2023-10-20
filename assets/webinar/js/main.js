//Form submission
$(document).ready(function(){

    var popupElm = document.getElementsByClassName('popup-section')[0];
    let registerBtn = document.getElementById("register-btn");
    function submitForm(){
    // Initiate Variables With Form Content
        registerBtn.setAttribute("disabled", true);
        var name = $("#userName").val();
        var email = $("#userMail").val();
        var mobileNo = $("#userNumber").val();
        var degree = $("#yourdegree").val();
        var lookingfor = $("#lookingFor").val();
        var isPopupVal = $("#isPopup").val();
        var createdat = new Date().toLocaleString();
        $.ajax({
            type: "POST",
            // url: "webinar-register-form.php",
            url: "workplace/add-leads.php",
            data: "postType=leads" + "&leadname=" + name + "&leademail=" + email + "&leadmobile=" + mobileNo + "&leaddegree=" + degree + "&lookingfor="+lookingfor + "&createdat="+createdat, 
            success : function(text){
                if(text == "created success"){
                    formSuccess(isPopupVal);
                    registerBtn.removeAttribute("disabled");
                }else{
                    errPopup();
                    registerBtn.removeAttribute("disabled");
                }
            },
            
        });
    }
    function formSuccess(isPop){
        $("#register_form_submit")[0].reset();
        window.location.href = "success-page/python/thankyou.html?relatedfor=Master the IT Industry";
        if(isPop === "popupform"){
            let bodyElm = document.body;
            document.getElementById("register-popup-form").style.display = "none";
            document.getElementsByClassName("modal-backdrop")[0].remove();
            bodyElm.classList.remove("modal-open");
            bodyElm.style = "";
        }

        //Add data in server
        // $.ajax({
        //     type: "POST",
        //     url: "http://localhost:3002/webinar/add-leads",
        //     data: { name: name, email: email, mobileno: mobileNo, degree: degree, lookingfor: lookingfor },
        //     success: function(data) {
        //         // console.log(data);
        //     },
        //     error: function(jqXHR, textStatus, err) {
        //         // console.log('text status '+textStatus+', err '+err);
        //     }
        // });
    }
    function errPopup(){
        $("#register_form_submit")[0].reset();
        popupElm.classList.add("popup-active");
        setTimeout(function(){
            popupElm.classList.remove('popup-active');
        }, 3000);
    }

    $("#register_form_submit").submit(function(event){
        // cancels the form submission
        event.preventDefault();
        
        let isFrmValid = true;
        $(".form-control").each(function(n){
          if($.trim($(this).val()) == "") {
            $(this).addClass("invalid-form")
             $(this).next("p.error-inpt").addClass("invalid-input");
             isFrmValid = false;
          }else{
            $(this).removeClass("invalid-form")
            $(this).next("p.error-inpt").removeClass("invalid-input");
          }
        })
        let userNum = document.getElementById("userNumber");
       
        if(isFrmValid){
            if(userNum.value.length >= 10){
                submitForm();
                $(".no-error").removeClass("invalid-input");
            }else{
                $(".no-error").addClass("invalid-input");
            }
            
        }
        
    });

  
    

})


