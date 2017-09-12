/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";

		//scroll to CVPage
		$(".scrollToCV").click(function(){
			$("html, body").animate({ scrollTop: $("#CVPage").offset().top }, 700);
				return false;
		});
    
        //scroll to PortfolioPage
		$(".scrollToPortfolio").click(function(){
			$("html, body").animate({ scrollTop: $("#PortfolioPage").offset().top }, 1000);
				return false;
		});
    
        //scroll to ContactPage
		$(".scrollToContact").click(function(){
			$("html, body").animate({ scrollTop: $("#ContactPage").offset().top }, 1000);
				return false;
		});
        
        //scroll to top
		$("#scrollup").click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
    
        //scroll to top
		$(".scrollup").click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
});