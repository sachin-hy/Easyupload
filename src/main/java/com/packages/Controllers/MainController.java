package com.packages.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

	
	@RequestMapping("/")
	public String index()
	{
		return "redirect:/indexpage";
	}
	
	
	
	
	
	@RequestMapping("/indexpage")
	public String indexPage()
	{
		return "index";
	}
	
	
	
     
}
