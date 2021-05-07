package com.certMP.TiendaEcommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mercadopago.MercadoPago;

@SpringBootApplication
public class TiendaECommerceApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TiendaECommerceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		MercadoPago.SDK.setAccessToken("APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398");
		
	}

	
}
