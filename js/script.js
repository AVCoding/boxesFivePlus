



// =========================================================================




$(document).ready(function(){
    // Mobile nav touch
    // $('.left-sb-wrapper').on("swipeleft", closeNav);


    // function disabledraggable(item){
    //   if(item.find('.total').val() < 1){
    //     $(item).draggable({ disabled: true });
    //   }
    //   else{
    //     return;
    //   }
    // }




  var fakeWrapper = `<div class="open-box-wrapper">
                        <div class="open-box">

                      </div>
                    </div>

                   `;
  var fakeDropbox = `<div class="dropped-box"></div>`;

   var fakeItems = `<div class="item" data-item="milk" >  
              <a href="javascript:void(0)">
                <img src="https://ychef.files.bbci.co.uk/976x549/p07vvrpj.jpg" width="35" height="35">
              </a>
              <input type="text" name="total" class="total" value="5" readonly="readonly"> шт.
            </div>
        
            <div class="item"  data-item="cola" > 
              <a href="javascript:void(0)">
                <img src="https://media.istockphoto.com/photos/coke-picture-id458464735?k=20&m=458464735&s=612x612&w=0&h=CW8rzEiIMvuO23X9I3b6U_g2aBUQSZnWYLjWauLMxtg=" width="35" height="35">
              </a>
              <input type="text" name="total" class="total" value="3" readonly="readonly"> шт.
            </div>

            <div class="item" data-item="fanta" > 
              <a href="javascript:void(0)">
                <img src="https://www.coca-cola.ru/content/dam/one/ru/ru/products/fanta-orange-330-glass.png" width="35" height="35">
              </a>
              <input type="text" name="total" class="total" value="1" readonly="readonly"> шт.
            </div>`;

    // var fakeBasket = `<div class="basket">  
    //         <p>Перетащите товар сюда</p>
    //         <img src="https://media.istockphoto.com/photos/isolated-shot-of-opened-blank-cardboard-box-on-white-background-picture-id1128890899?k=20&m=1128890899&s=612x612&w=0&h=GfjgLKbgACDs0WcVQXie7fw0_NNwu2w01RmX2MKcC-Q=" class="open-box">   
    //       </div>`;

    var fakeBasket = `<div class="basket">  
      <h5>Перетащите товар сюда</h5>
      <p>Чтобы отправить его пакупателью в отдельной упаковке</p>
    </div>`;

    var fakeTitle = `<h5 class="title">Отправление <span></span></h5>`;

     // ========================

    // $('#main').append(fakeWrapper);
    // $('.dropped-box-wrapper .dropped-box:nth-child(1) ').append(fakeItems);
    // $('.open-box-wrapper').eq(1).prepend(fakeBasket);
    $('.open-box-wrapper').eq(1).prepend(fakeTitle);
    $('.open-box-wrapper').eq(1).find('.title > span').text( parseInt( $('.open-box-wrapper').eq(0).find('.title > span').text() ) + 1);




    $(".item").draggable({
      revert: "invalid",
      containment: "document",
      helper: "clone",
      cursor: "move",
      start  : function(event, ui){
          $(ui.helper).css('width', `${ $(event.target).width() }px`);
      }
    });




    function updateDroppables(){
        $( ".title" ).droppable({
            accept: ".main-item.item",
            // accept: function(e){
            //       // alert(e.attr('class'));
            //   if(e.hasClass('item' )){
            //     return "item";
            //   }
            // },
            // activeClass: "ui-droppable",

            drop: function(event, ui) {
              // event.preventDefault();

              // debugger

              var parentBox = $(this).parents('.open-box-wrapper');
              var parentItems = $(this).parents('.open-box-wrapper').find('.item');



              if (parentBox.find('.item[data-item="'+ $(ui.draggable).data('item') +'"]').length < 1) {
                



                // if there is no an item inside of box with same name as draggable item , than add it to a new box
                parentBox.find('.open-box').append($(ui.draggable).clone() );
                parentBox.find('.item').removeClass('main-item');


                // delete current item from main items
                $('.main-item[data-item="' + $(ui.draggable).data('item') +'"]').remove();

              }



              if ($(this).parents('.open-box-wrapper').find('.item').length == 1  ) {

                if($(this).parents('.open-box-wrapper').next('.open-box-wrapper').find('.title').length  == 1){
                  return;
                }
                else{
                // adding new box wrapper

                parentBox.after(fakeWrapper);
                // adding new dropping title
                parentBox.next('.open-box-wrapper').prepend(fakeTitle);
                parentBox.next('.open-box-wrapper').find('.title > span').text( parseInt( parentBox.find('.title > span').text() ) + 1);

                }

                // // adding new box wrapper
                // parentBox.after(fakeWrapper);
                // // adding new dropping title
                // parentBox.next('.open-box-wrapper').prepend(fakeTitle);
                // parentBox.next('.open-box-wrapper').find('.title > span').text( parseInt( parentBox.find('.title > span').text() ) + 1);

              }


                updateDroppables();
            }
        });


    };


    updateDroppables();


});




$(document).on('click','.minus-item',function(){

  $(this).siblings('.total').text(parseInt($(this).siblings('.total').text()) - 1 );  


  // remove item from box
  if ($(this).siblings('.total').text() == 0) {

     // remove box if its empty
    if ($(this).parents('.open-box-wrapper').find('.item').length == 1) {
      $(this).parents('.open-box-wrapper').remove();

      $('.title').each(function(index){

        $(this).find('span').text( index + 1 );
      });
    }

    // remove item from the box
    $(this).parents('.item').remove();


  }



  // plus one more item to main box
  if ($('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).length  == 1  ){
    $('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).find('.total').text( parseInt( $('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).find('.total').text() ) + 1);    
  }

  // send  first item to main box
  if ($('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).length < 1 ) {
    $('.main-open-box').append($(this).parents('.item').clone().draggable({
                                                              revert: "invalid",
                                                              containment: "document",
                                                              helper: "clone",
                                                              cursor: "move"
                                                            }).addClass('main-item'));
    $('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]').find('.total').text(1);

  
  };

  

});

