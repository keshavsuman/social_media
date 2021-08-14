import $ from "jquery"

$(document).ready(function () {

	if($(window).width() < 991)
    {
		$(".gsearch").on("click", function (e) {
			$("body").toggleClass("searchopen");
			e.stopPropagation();
		});
		$(".searchbox").on("click", function (e) {
			e.stopPropagation();
		});
	}

	$(".content").hide();
    $(".show_hide").on("click", function () {
        var txt = $(".content").is(':visible') ? 'View More' : 'View Less';
        $(this).text(txt);
        $(this).parent("p").children('.content').slideToggle(200);
    });
    /******* Social *******/
	$(".likedrop").on("click", function (e) {
		$(".col").removeClass("socialopen");
		$(this).parent(".col").toggleClass("socialopen");
		e.stopPropagation();
	});
	$(".likedropdown").on("click", function (e) {
		e.stopPropagation();
	});

});
$(document).click(function () {
	$("body").removeClass("searchopen");
	$(".col").removeClass("socialopen");
});