$(document).ready(function(){
	// Menu toggle for mobile menu 
	var navLinkMob = document.getElementsByClassName("nav-link-mb");
	var dropdownMenuMob = document.getElementsByClassName("dropdown-menu-mb");
	var menuBtn = document.getElementById("menu-toggle-btn");
	var menuMob = document.getElementsByClassName("header-menu-mb")[0];

	menuBtn.addEventListener("click", ()=>{
		menuMob.classList.toggle("active-nav-mb");
		menuBtn.classList.toggle("active-close-btn");
		for(let i = 0; i < dropdownMenuMob.length; i++){
			$(dropdownMenuMob[i]).slideUp();
		}
	})

	
	for(var i = 0; i < navLinkMob.length; i++){
		
		$(navLinkMob[i]).click(function(e){
			e.preventDefault();
		    $(this).parent("li").children(".dropdown-menu-mb").slideToggle();
		});
		
	}


});


// Port folio 
let _all = document.getElementsByClassName("all");
let portLink = document.getElementsByClassName("port-link");
let notIndx = 0;
for(let i = 0; i < _all.length; i++){
    _all[i].classList.add("show-port");
}
for(let i = 0; i < portLink.length; i++){
    portLink[i].addEventListener("click", function(e){
        e.preventDefault(); 
        if(notIndx != i){
            activePort(this.dataset.port, i);
            document.getElementsByClassName("active-port")[0].classList.remove("active-port");
            document.getElementsByClassName("port-link")[i].classList.add("active-port");
        }
    })
}
function activePort(obj, n){
    notIndx = n;
    var getPort,
    showPort = document.getElementsByClassName("show-port");
    if(obj != "all"){
        getPort = document.getElementsByClassName(obj);
        for(let i = 0; i < _all.length; i++){
            _all[i].classList.remove("show-port");
            _all[i].classList.add("hide-port");
        }
        setTimeout(function(){
            _removeHidePort();
            for(let i = 0; i < getPort.length; i++){
                getPort[i].classList.add("show-port");
            }
        }, 300);
        
    }else{
        for(let i = 0; i < showPort.length; i++){
            showPort[i].classList.add("hide-port");
            showPort[i].classList.remove();  
        }
        setTimeout(function(){ 
            _removeHidePort();
            for(let i = 0; i < _all.length; i++){
                _all[i].classList.add("show-port");
            }
        }, 300);
        
    }
    
}

function _removeHidePort(){
    for(let i = 0; i < _all.length; i++){
        _all[i].classList.remove("hide-port");
    }
}


//Enquery checkbox function
function onChangereqtype(str){
    if(str == "01"){
        document.getElementById("company").classList.remove("active-inpt");
        document.getElementById("self").classList.add("active-inpt");
        
    }else{
        document.getElementById("self").classList.remove("active-inpt");
        document.getElementById("company").classList.add("active-inpt");
        
    }
}

//Show more lesson
// let moreLesson = document.getElementsByClassName("more-lesson")[0];
function showMoreLesson(event){
    let parentDOM = event.target.parentNode;
    let accordItems =  parentDOM.getElementsByClassName("accordion-item");
    console.log(accordItems.length)
    for(let x = 0; x < accordItems.length; x++){
        accordItems[x].classList.remove("d-none");
    }
    event.target.style.display = "none";
}
// moreLesson.addEventListener("click", showMoreLesson);

//Read more
let readMoreBtn = document.getElementsByClassName("read-dots");
if(readMoreBtn){
    for(let r = 0; r < readMoreBtn.length; r++){
        readMoreBtn[r].addEventListener("click", function(event){
            event.preventDefault();
            let readmoreParent = event.target.parentNode;
            let moreTxt = readmoreParent.getElementsByClassName("more-txt");
            moreTxt[0].classList.remove("d-none");
            event.target.classList.add("d-none");
        })
    }
    
}


//Form submission
let closeEnroll = document.getElementById("close-enroll");
let syllabusForm = document.getElementById("syllabus-form");
let errorInpt = document.getElementsByClassName("error-inpt");
let errorNo = document.getElementsByClassName("error-no");
let popupElm = document.getElementsByClassName('popup-section')[0];
let _modal = document.getElementsByClassName("fade"); 
let requestSyllabusModal = document.getElementById("requestSyllabus");
let successMsg = document.getElementsByClassName("success-msg")[0];
let errorMsg = document.getElementsByClassName("error-msg")[0];

let syllabusArr = [
    {syllabus:"Front End Developer", syllabusPdf:"assets/images/syllabus/Front-End-Developer.docx"},
    {syllabus:"Back End Developer", syllabusPdf:"assets/images/syllabus/Back-End-Developer.docx"},
    {syllabus:"Full Stack Developer", syllabusPdf:"assets/images/syllabus/Full-Stack-Developer.docx"},
    {syllabus:"UI/UX Designer", syllabusPdf:"assets/images/syllabus/UI-UX-Designer.docx"},
    {syllabus:"Manual Testing", syllabusPdf:"assets/images/syllabus/Manual-Testing.docx"},
    {syllabus:"Digital Marketing", syllabusPdf:"assets/images/syllabus/Digital-Marketing.docx"},
    {syllabus:"API Testing", syllabusPdf:"assets/images/syllabus/API-Testing.docx"},
]
let thankPage = {
    fed:"success-page/thankyou-FED.html",
    bed:"success-page/thankyou-BED.html",
    fsd:"success-page/thankyou-FSD.html",
    uiux:"success-page/thankyou-UI-UX.html",
    dm:"success-page/thankyou-DM.html",
    api:"success-page/thankyou-API.html",
    mt:"success-page/thankyou-MT.html"
}

//Close modal
if(closeEnroll){
    closeEnroll.addEventListener("click", function(){
    
        syllabusForm.reset();
        for(let i = 0; i < errorInpt.length; i++){
            errorInpt[i].classList.remove("invalid-input");   
        }
        errorNo[0].classList.remove("invalid-input");
        
    })
}

function getId(id){
    return document.getElementById(id);
}
function getClass(cl){
    if(cl){
        return document.getElementsByClassName(cl)[0];        
    }
}


//Submit a form
function submitForm(inptData, getForm){
    // Initiate Variables With Form Content
    if(getForm === "syllabus"){
        let {fName, lName, email, city, mobileNo, lookingFor, message, page} = inptData;
        getClass(getForm+"-btn").setAttribute("disabled", true);
        $.ajax({
         
            type: "POST",
            url: "register-form.php",
            data: "formtype=syllabus"+ "&fname=" + fName + "&lname=" + lName + "&email=" + email + "&mobileno=" + mobileNo + "&city=" + city + "&lookingfor=" + lookingFor + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    window.location.href = thankPage[page];
                    formSuccess(getForm, lookingFor);
                    getClass(getForm+"-btn").setAttribute("disabled", false);

                    // successMsg.classList.add("active");                        
                    errorMsg.classList.remove("active");
                }else{
                    successMsg.classList.remove("active");
                    errorMsg.classList.add("active");
                    getClass(getForm+"-btn").setAttribute("disabled", false);

                }
            }
        });
    }
    if(getForm === "enquiry"){
        let {name, email, mobileNo, lookingFor, message, page} = inptData;
        getClass(getForm+"-btn").setAttribute("disabled", true);
        $.ajax({
         
            type: "POST",
            url: "register-form.php",
            data: "formtype=enquiry"+ "&name=" + name + "&email=" + email + "&mobileno=" + mobileNo + "&lookingfor=" + lookingFor + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    window.location.href = thankPage[page];  
                    formSuccess(getForm, lookingFor);
                    getClass(getForm+"-btn").setAttribute("disabled", false);
                    // successMsg.classList.add("active");
                    errorMsg.classList.remove("active");
                }else{
                    successMsg.classList.remove("active");
                    errorMsg.classList.add("active");
                    getClass(getForm+"-btn").setAttribute("disabled", false);
                }
            }
        });
    }
    if(getForm === "enquire-consulation"){
        let {name, email, mobileNo, lookingFor, page} = inptData;
        getClass(getForm+"-btn").setAttribute("disabled", true);
        $.ajax({
         
            type: "POST",
            url: "register-form.php",
            data: "formtype=consulation"+ "&name=" + name + "&email=" + email + "&mobileno=" + mobileNo + "&lookingfor=" + lookingFor,
            success : function(text){
                if (text == "success"){
                    window.location.href = thankPage[page];
                    formSuccess(getForm, lookingFor);
                    getClass(getForm+"-btn").setAttribute("disabled", false);
                    // successMsg.classList.add("active");
                      
                    errorMsg.classList.remove("active");
                }else{
                    successMsg.classList.remove("active");
                    errorMsg.classList.add("active");
                    getClass(getForm+"-btn").setAttribute("disabled", false);
                }
            }
        });
    }
    
}
    
function formSuccess(formReset, sylbs){
    for(let s = 0; s < _modal.length; s++){
        _modal[s].classList.remove("show");
    }

    document.getElementById(formReset+"-form").reset();
    // popupElm.classList.add("active");
    if(formReset === "syllabus"){
        // document.getElementsByClassName("download-syllabus-enroll")[0].classList.remove("d-none");
        let bodyElm = document.body;
        requestSyllabusModal.style.display = "none";
        document.getElementsByClassName("modal-backdrop")[0].remove();
        bodyElm.classList.remove("modal-open");
        bodyElm.style = "";
        // let findSyllabus = syllabusArr.find(data => data.syllabus === sylbs);
        // let syllabusLink = document.getElementById("syllabus-link");
        // syllabusLink.href = findSyllabus.syllabusPdf;
        // setTimeout(function(){
        //     popupElm.classList.remove('active');
        // }, 3000);
    }
    
}

let closeBtns = document.getElementsByClassName("close-btns");
for(let c = 0; c < closeBtns.length; c++){
    closeBtns[c].addEventListener("click", function(event){
        let closeTarget = event.target.dataset.target;
        document.getElementsByClassName(closeTarget)[0].classList.remove("active")
    })
}


function validateForm(req){

    let inputsElm = document.getElementsByClassName(req+"-inpt");
    
    let isFrmValid = true;
    for(let i = 0; i < inputsElm.length; i++){
        if(inputsElm[i].value === "" || inputsElm[i].value === "none"){
            let getParaentNode = inputsElm[i].parentNode;
            let errElm = getParaentNode.getElementsByClassName("error-inpt")[0];
            errElm.classList.add("invalid-input");
            isFrmValid = false;
        }
        else{
            
            let getParaentNode = inputsElm[i].parentNode;
            let errElm = getParaentNode.getElementsByClassName("error-inpt")[0];
            errElm.classList.remove("invalid-input");
        }
    }
    
    let sylbsmobileNo = document.getElementById(req+"-mobileNo");
    
    if(isFrmValid){
        if(sylbsmobileNo.value.length >= 10){
            document.getElementsByClassName(req+"-no-err")[0].classList.remove("invalid-input");
            let inputsData;
            if(req === "syllabus"){
                inputsData = {
                    fName: getNameVal(req+"-fname"),
                    lName: getNameVal(req+"-lname"),
                    email: getNameVal(req+"-email"),
                    city: getNameVal(req+"-city"),
                    mobileNo: getNameVal(req+"-phone"),
                    lookingFor: getNameVal(req+"-looking-for"),
                    message: getNameVal(req+"-message"),
                    page:getNameVal(req+"-page")
                }
            }else if(req === "enquiry"){
                inputsData = {
                    name: getNameVal(req+"-name"),
                    email: getNameVal(req+"-email"),
                    mobileNo: getNameVal(req+"-phone"),
                    lookingFor: getNameVal(req+"-looking-for"),
                    message: getNameVal(req+"-message"),
                    page:getNameVal(req+"-page")
                }
            }else if(req === "enquire-consulation"){
                inputsData = {
                    name: getNameVal(req+"-name"),
                    email: getNameVal(req+"-email"),
                    mobileNo: getNameVal(req+"-phone"),
                    lookingFor: getNameVal(req+"-course"),
                    page:getNameVal(req+"-page")
                }
            }
            submitForm(inputsData, req);
        }else{
            document.getElementsByClassName(req+"-no-err")[0].classList.add("invalid-input");
        }
        
    }
}

function getNameVal(name){
    return document.getElementsByName(name)[0].value;
}