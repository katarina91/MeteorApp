Images = new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient) {
  
  Session.set("imageLimit", 8);
  var lastScrollTop = 0;
  
  $(window).scroll(function(event){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100)
    {
      //were am I in the page
      var scrollTop = $(this).scrollTop();
      if(scrollTop > lastScrollTop)
      {
        Session.set("imageLimit", Session.get("imageLimit") + 4);
        //console.log('going down');
      }
      //test if we are going down
      lastScrollTop = scrollTop;
    }
    //console.log(new Date());
  });
  
   Accounts.ui.config({
      passwordSignupFields: "USERNAME_AND_EMAIL"
    });
  
  Template.images.helpers({ 
   images:function(){
     if(Session.get("userFilter")){
       return Images.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating:-1}});
     }
     else{
       return Images.find({}, {sort:{createdOn: -1, rating:-1}, limit: Session.get("imageLimit")});
     }
   },
   getFilterUser:function(){
     if(Session.get("userFilter")){
       var user = Meteor.users.findOne({_id:Session.get("userFilter")});
       return user.username;
     }
     else{
       return false;
     }
   },
   getUser: function(user_id){
     var user = Meteor.users.findOne({_id:user_id});
     if(user){
       return user.username;
     }
     else{
       return "anonimys";
     }
   },
   filtering_images: function(){
     if(Session.get("userFilter")){
       return true;
     }
     else{
       return false;
     }
   }
   });
   
   Template.body.helpers({username: function(){
     if(Meteor.user()){
       return Meteor.user().username;
      // return Meteor.user().emails[0].address;
     }
     else{
       return "anonymus internet user";
     }
   }
   });

  Template.images.events({
    'click .js-image': function (event) {
      $(event.target).css("width", "50px");
    },
    'click .js-delete-image': function(event){
      var image_id = this._id;
      console.log(image_id);
      $('#'+image_id).hide('slow', function(){
        Images.remove({_id:image_id});
      });
    },
    'click .js-rate-image': function(event){
      var rating = $(event.currentTarget).data('userrating');
      console.log(rating);
      var image_id = this.id;
      console.log(image_id);
      Images.update({_id:image_id}, {$set: {rating:rating}});
    },
    'click .js-show-image-form': function(event){
      $('#image_add_form').modal('show');
    },
    'click .js-set-image-filter':function(event){
      Session.set('userFilter', this.createdBy);
    },
    'click .js-unset-image-filter':function(event){
      Session.set('userFilter', undefined); 
    }
  });
  
  Template.image_add_form.events({
    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log(img_src + img_alt );
     //return false;
     if(Meteor.user()){
        Images.insert({
          img_src: img_src,
          img_alt: img_alt,
          createdOn: new Date(),
          createdBy: Meteor.user()._id
        }); 
     }
      $('#image_add_form').modal('hide');
    }
  });
  
}
