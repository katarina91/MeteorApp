Images = new Mongo.Collection("images");


//set up security on Image collection
Images.allow({
	insert:function(userId, doc){//userId is automatic from Meteor
		console.log("testing");
		if(Meteor.user())//user is  logged in
		{
			if(userId != doc.createdBy){
				return false;
			}
			else{
				return true;
			}
		}
		else{//user is not logged in
			return false;
		}
		return true;
	},
	remove:function(userId, doc){
		return true;
	}
});