$(function()
{
    $("#loading").fadeOut(500);

    let navBodyWidth=$('.navbody').innerWidth();
$('nav').animate({left:-navBodyWidth},0);
$('.navHeader .closebtn').click(function(){
    if($('nav').css('left') == '0px'){
        $('nav').animate({left:-navBodyWidth},1000);
        document.querySelector('nav .navHeader i').classList.replace("fa-x","fa-bars")
        
    }else{
        $('nav').animate({left:'0px'},1000);
        document.querySelector('nav .navbody button').classList.add('animate__animated animate__slideInUp')
        document.querySelector('nav .navHeader i').classList.replace("fa-bars","fa-x")
    }
});
getData();
async function getData()
{
    
   let initialResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
   
  let mealsBox = await initialResponse.json();
  $("#loading").fadeOut(500);
  displayHeaderOfMeal(mealsBox.meals)
  $("#headPage .container .row").click(function(e){
     document.querySelector("#headPage").classList.remove("d-none");
    mealDisplay(mealsBox.meals,$(e.target).attr('id'))
 })
};
 function displayHeaderOfMeal(mealsBox)
{
    let mealbox=``;
    for(let i=0;i<mealsBox.length;i++){
        mealbox+=`
        <div class="col-md-3">
        <div class="mealCard rounded-5 position-relative">
          <img src="${mealsBox[i].strMealThumb}" class="w-100 rounded-5">
          <div class="layer rounded-5 position-absolute  d-flex justify-content-start align-items-center" id="${i}">
            <h2 class="ps-2">${mealsBox[i].strMeal}</h2>
          </div>
        </div>
      </div>
        
        `
    }
    document.querySelector("#meals").innerHTML=mealbox;
    $("#headPage").css("display","block")
    $("#headPage").siblings().css("display","none")
};
 function mealHeaderDisplay (meal,i)
{
   let header=``;
   header+=
   `
   <img src="${meal[i].strMealThumb}" class="w-100" />
   <h2>${meal[i].strMeal}</h2>
   `
   document.querySelector("#header").innerHTML=header;
};
 function mealInfoDisplay (meal,i)
{
    let mainInfo=``;
    mainInfo+=
    `
    <h2>Instructions</h2>
     <p>
     ${meal[i].strInstructions}
     </p>
     <h3 class="fw-bolder">Area: <span class="fw-normal">${meal[i].strArea}</span></h3>
     <h3 class="fw-bolder">Category: <span class="fw-normal">${meal[i].strCategory}</span></h3>
    `
    document.querySelector("#mainInfo").innerHTML=mainInfo;

};
 function recDisplay (meals,i)
{
    let recArr= new Map;
     recArr.set(meals[i].strMeasure1,meals[i].strIngredient1).set(meals[i].strMeasure2,meals[i].strIngredient2).set(meals[i].strMeasure3,meals[i].strIngredient3).set(meals[i].strMeasure4,meals[i].strIngredient4).set(meals[i].strMeasure5,meals[i].strIngredient5).set(meals[i].strMeasure6,meals[i].strIngredient6).set(meals[i].strMeasure7,meals[i].strIngredient7).set(meals[i].strMeasure8,meals[i].strIngredient8).set(meals[i].strMeasure9,meals[i].strIngredient9).set(meals[i].strMeasure10,meals[i].strIngredient10).set(meals[i].strMeasure11,meals[i].strIngredient11).set(meals[i].strMeasure12,meals[i].strIngredient12).set(meals[i].strMeasure13,meals[i].strIngredient13).set(meals[i].strMeasure14,meals[i].strIngredient14).set(meals[i].strMeasure15,meals[i].strIngredient15).set(meals[i].strMeasure16,meals[i].strIngredient16).set(meals[i].strMeasure17,meals[i].strIngredient17).set(meals[i].strMeasure18,meals[i].strIngredient18).set(meals[i].strMeasure19,meals[i].strIngredient19).set(meals[i].strMeasure20,meals[i].strIngredient20);
     let recSet = new Set (recArr);
     let finalArr=[...recSet];
     let listOfRec =``
    for(let i=0 ; i< (finalArr.length)-1;i++ )
    {
        listOfRec+=
        `
        <div class="col-md-3">
        <span class="fw-normal fs-6 bg-info rounded-5 px-2 text-black py-1">${finalArr[i][0]} ${finalArr[i][1]}</span>
      </div>
        `
    //     $("#reec").append(`<div class="col-md-3">
    //     <span class="fw-normal fs-6 bg-info rounded-5 px-2 text-black py-1">${finalArr[i][0]} ${finalArr[i][1]}</span>
    //   </div>`)
    }

    document.querySelector("#reec").innerHTML=listOfRec;
};
 function tagDisplay(meal,i)
{
    let tag=``;
    if(meal[i].strTags != null)
    {
        tag+=
    `
    <div class="col-md-3 d-block">
                    <span class="fw-normal fs-6 bg-warning rounded-5 px-3 text-black py-1">${meal[i].strTags} </span>
                  </div>
                  <div class="col-md-2">
                    <span class="fw-normal fs-6 bg-danger rounded-5 px-3 text-black py-1"><a class="text-decoration-none text-black" href="${meal[i].strSource}">source</a></span>
                  </div>
                  <div class="col-md-2">
                    <span class="fw-normal fs-6 bg-body rounded-5 px-3 text-black py-1"><a class="text-decoration-none text-black" href="${meal[i].strYoutube}">youtube</a></span>
                  </div>
    
    `
    }else
    {
        tag+=
        `
                      <div class="col-md-2">
                        <span class="fw-normal fs-6 bg-danger rounded-5 px-3 text-black py-1"><a class="text-decoration-none text-black" href="${meal[i].strSource}">source</a></span>
                      </div>
                      <div class="col-md-2">
                        <span class="fw-normal fs-6 bg-body rounded-5 px-3 text-black py-1"><a class="text-decoration-none text-black" href="${meal[i].strYoutube}">youtube</a></span>
                      </div>
        
        `
    }
    document.querySelector("#tag").innerHTML=tag;
    
    
};
 function mealDisplay(meal,i)
{
    mealHeaderDisplay(meal,i);
    mealInfoDisplay(meal,i);
    recDisplay(meal,i);
    tagDisplay(meal,i);
    $("#mealInfo").css("display","block")
    $("#mealInfo").siblings().css("display","none")
   
};
document.querySelector("#searchItem").addEventListener("click",function(e){
    $("#search").css("display","block")
    $("#search").siblings().css("display","none")
    $('nav').animate({left:-navBodyWidth},1000);
});
document.querySelector("#searchName").addEventListener("input",function(){

    searchByName(this.value);
    $("#headPage").css("display","block")
    
});
document.querySelector("#searchLetter").addEventListener("input",function(){

    searchByLetter(this.value);
    $("#headPage").css("display","block")
});
async function searchByName (value)
{
    $("#loading").fadeIn(500);
    let initialResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    let mealsBox = await initialResponse.json();
    $("#loading").fadeOut(500);
    displayHeaderOfMeal(mealsBox.meals)
    $("#search").css("display","block");
    $("#headPage .container .row").click(function(e){
        document.querySelector("#headPage").classList.remove("d-none");
       mealDisplay(mealsBox.meals,$(e.target).attr('id'))
    })
};
async function searchByLetter (value)
{
    let initialResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    let mealsBox = await initialResponse.json();
    displayHeaderOfMeal(mealsBox.meals)
    $("#search").css("display","block");
    $("#headPage .container .row").click(function(e){
        document.querySelector("#headPage").classList.remove("d-none");
       mealDisplay(mealsBox.meals,$(e.target).attr('id'))
    })
};
let categoryName;
async function getAllCategory()
{
    $("#loading").fadeOut(500);
    let initialResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let categoryBox = await initialResponse.json();
    $("#loading").fadeOut(500);
    displayCategory(categoryBox.categories)
   $("#category .container .row").click(function(e){
    categoryName =$(e.target).parent().parent().parent().attr('id');
    getMealByCategory(categoryName);
   })
};
$("#Categories").click(function(){
    getAllCategory();
    $("#category").css("display","block")
    $("#category").siblings().css("display","none")
    $('nav').animate({left:-navBodyWidth},1000);
});
function displayCategory(categories)
{
   for(let i=0;i<categories.length;i++)
   {
    $("#categoryCard").append(`
    <div class="col-md-3" id="${categories[i].strCategory}">
            <div class="mealCard rounded-5 position-relative p-3">
              <img src="${categories[i].strCategoryThumb}" class="w-100 rounded-5">
              <div class="layer rounded-5 position-absolute p-3 d-flex justify-content-start flex-column align-items-center text-center">
                   <h3>${categories[i].strCategory}</h3>
                   <p>${categories[i].strCategoryDescription}</p>
              </div>
            </div>
          </div>
    `);
   }
};
async function getMealByCategory(categoryName)
{
    let initialResponse = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    let categoryMeals = await initialResponse.json();
    displayHeaderOfMeal(categoryMeals.meals)

    $("#headPage .container .row .col-md-3").click(function(e){
       let mealName =e.target.innerText;
       displayByCategoryName(mealName);
 })
};
async function displayByCategoryName(mealName)
{
    let initialResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let meal = await initialResponse.json();
    let i=0;
     mealDisplay(meal.meals,i);
};
async function areaDisplay()
{
    let initialResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let AreaList = await initialResponse.json();
    let Area =``
    for(let i=0;i<AreaList.meals.length;i++)
    {
        Area+=
        `
        <div class="col-md-3 d-flex flex-column justify-content-center align-items-center ">
            <i class="fa-solid fa-house-laptop fa-2xl text-white text-center pb-2"></i>
            <h3 class="fw-bolder text-white text-center pt-2">${AreaList.meals[i].strArea}</h3>
          </div>
        `
    }
    document.querySelector("#area .container .row").innerHTML=Area;
    $("#area").css("display","block");
    $("#area").siblings().css("display","none");
};
async function searchByArea (area)
{
    let initialResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let AreaMeals = await initialResponse.json();
    displayHeaderOfMeal(AreaMeals.meals)
    $("#headPage .container .row .col-md-3").click(function(e){
        let mealName =e.target.innerText;
        displayByCategoryName(mealName);
    })
    

}
$("#areaBtn").click(function(){
    areaDisplay()
    $('nav').animate({left:-navBodyWidth},1000);
    document.querySelector("#area .container .row ").addEventListener("click",function(e){
        let areaName = e.target.innerText;
        searchByArea(areaName);
        $("#headPage").css("display","block");
       $("#area").css("display","none");
    //    mealDisplay(AreaMeals.meals,)
  })

});
async function searchByingr (ingr)
{
    let initialResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`);
    let ingrMeals = await initialResponse.json();
    displayHeaderOfMeal(ingrMeals.meals)
    $("#headPage .container .row .col-md-3").click(function(e){
        let mealName =e.target.innerText;
        displayByCategoryName(mealName);
    })
    

}
async function ingDisplay()
{
    let initialResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingList = await initialResponse.json();
    let ings =``
    for(let i=0;i<25;i++)
    {
        ings+=
        `
        <div class="col-md-3 text-center">
            <i class="fa-solid fa-drumstick-bite fa-5x text-white"></i>
            <h3 class="fw-bolder text-center text-white">${ingList.meals[i].strIngredient}</h3>
            <p class="fw-bolder text-center text-white">${ingList.meals[i].strDescription}</p>

          </div>
        `
    }
    document.querySelector("#ingredient .container .row").innerHTML=ings;
    $("#ingredient").css("display","block");
    $("#ingredient").siblings().css("display","none");
};
$("#ingrsBtn").click(function(){
    ingDisplay()
    $('nav').animate({left:-navBodyWidth},1000);
     document.querySelector("#ingredient .container .row ").addEventListener("click",function(e){
        let areaName = e.target.innerText;
        console.log(areaName)
      searchByingr(areaName);
          $("#headPage").css("display","block");
         $("#ingredient").css("display","none");
   });
});

$("#conatctBtn").click(function(){
    $("#contactUs").css("display","block");
    $("#contactUs").siblings().css("display","none");
    $('nav').animate({left:-navBodyWidth},1000);
})
let nameFlage = false;
let emailFlage =false;
let phoneFlage = false;
let ageFlage =false;
let passwordFlage = false;
let RepasswordFlage =false;
let password;
function nameValidation ()
{
    let regex = /^[A-Z]([a-z]|[A-Z]){1,9}/;
    if(regex.test(document.querySelector("#name").value))
    {
        document.querySelector("#name").style.border="red solid 0px"
        $("#name").next('p').css("display","none")
        nameFlage = true;
    }else
    {
        document.querySelector("#name").style.border="red solid 5px"
        $("#name").next('p').css("display","block")
        nameFlage = false;
    }
};
function emailValidation ()
{
    let regex = /^.+(yahoo|gmail)\.com$/;
    if(regex.test(document.querySelector("#email").value))
    {
        document.querySelector("#email").style.border="red solid 0px"
        $("#email").next('p').css("display","none")
        emailFlage = true;
    }else
    {
        document.querySelector("#email").style.border="red solid 5px"
        $("#email").next('p').css("display","block")
        emailFlage = false;
    }
};
function phoneValidation ()
{
    let regex = /^(01)[0125]{1}[0-9]{8}$/;
    if(regex.test(document.querySelector("#phone").value))
        {
            document.querySelector("#phone").style.border="red solid 0px"
            $("#phone").next('p').css("display","none")
            phoneFlage = true;
        }else
        {
            document.querySelector("#phone").style.border="red solid 5px"
            $("#phone").next('p').css("display","block")
            phoneFlage = false;
        }
};
function ageValidation ()
 {
    let regex = /^[1-9]{1}[0-9]{1}$/;
if(regex.test(document.querySelector("#age").value))
        {
            document.querySelector("#age").style.border="red solid 0px"
            $("#age").next('p').css("display","none")
            ageFlage = true;
        }else
        {
            document.querySelector("#age").style.border="red solid 5px"
            $("#age").next('p').css("display","block")
            ageFlage = false;
        }
 };
function passwordValidation ()
{
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(regex.test(document.querySelector("#password").value))
        {
            document.querySelector("#password").style.border="red solid 0px"
            $("#password").next('p').css("display","none")
            passwordFlage = true;
            password=document.querySelector("#password").value;
        }else
        {
            document.querySelector("#password").style.border="red solid 5px"
            $("#password").next('p').css("display","block")
            passwordFlage = false;
        }
};

function reTypePassword ()
{
    if(document.querySelector("#Re-password").value == password)
    {
        document.querySelector("#Re-password").style.border="red solid 0px"
        $("#Re-password").next('p').css("display","none")
        RepasswordFlage = true;
        
    }else
    {
        document.querySelector("#Re-password").style.border="red solid 5px"
        $("#Re-password").next('p').css("display","block")
        RepasswordFlage = false;
    }
}

 $("#name").keyup(nameValidation).keyup(btnAccses);
 $("#email").keyup(emailValidation).keyup(btnAccses);
 $("#phone").keyup(phoneValidation).keyup(btnAccses);
 $("#age").keyup(ageValidation).keyup(btnAccses);
 $('#password').keyup(passwordValidation).keyup(btnAccses);
 $("#Re-password").keyup(reTypePassword).keyup(btnAccses);


function btnAccses ()
{
    if (nameFlage && emailFlage && phoneFlage && ageFlage && passwordFlage && RepasswordFlage)

{
    document.querySelector("#submitBtn").classList.remove("disabled");

}else
{
    document.querySelector("#submitBtn").classList.add("disabled");
}

}






})

















