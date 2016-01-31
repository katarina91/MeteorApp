if(Meteor.isServer){
	Meteor.startup(function(){
		if(Images.find().count() == 0){
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "cloudy.png",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "cloudy.png",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "cloudy.png",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "1.jpg",
				img_alt: "some picture"
			});
			Images.insert({
				img_src: "cloudy.png",
				img_alt: "some picture"
			});
		}
	});
}