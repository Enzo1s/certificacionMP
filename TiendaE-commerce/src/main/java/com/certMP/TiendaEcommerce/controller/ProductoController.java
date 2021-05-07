package com.certMP.TiendaEcommerce.controller;

import java.util.Optional;

import javax.servlet.ServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.certMP.TiendaEcommerce.entity.Producto;
import com.certMP.TiendaEcommerce.security.ProductoService;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.payment.Identification;
import com.mercadopago.resources.datastructures.payment.Payer;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/v1/producto")
public class ProductoController {

	@Autowired
	private ProductoService service;

	@GetMapping()
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok().body(service.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getOne(@PathVariable Long id) {
		Optional<Producto> o = service.findById(id);
		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Producto producto = o.get();
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(producto);
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody Producto producto) {
		Producto productoDb = service.save(producto);
		return ResponseEntity.status(HttpStatus.CREATED).body(productoDb);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@RequestBody Producto producto, @PathVariable Long id) {
		Optional<Producto> o = service.findById(id);
		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Producto productoDb = o.get();
		productoDb.setNombre(producto.getNombre());
		productoDb.setDescripcion(producto.getDescripcion());
		productoDb.setPrecio(producto.getPrecio());
		productoDb.setUrlImagen(producto.getUrlImagen());
		productoDb.setStock(producto.getStock());
		return ResponseEntity.status(HttpStatus.OK).body(productoDb);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/sale/{cantidad}")
	public ResponseEntity<?> sale(@RequestBody Producto producto, @PathVariable int cantidad) throws MPException {

		MercadoPago.SDK.setAccessToken("APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398");
		Preference preference = new Preference();

		Optional<Producto> o = service.findById(producto.getId());
		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Producto productodb = o.get();
		BackUrls backUrls = new BackUrls(
				"http://localhost:4200/productos",
				"http://localhost:4200/home",
				"http://localhost:4200/failure");
		Item item = new Item();
		item.setTitle(productodb.getNombre())
			.setQuantity(cantidad)
			.setUnitPrice(productodb.getPrecio());
		preference.appendItem(item);
		preference.setBackUrls(backUrls);
		preference.save();
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(preference);
	}
	
	/*@PostMapping("/process-payment")
	public ResponseEntity<?> verificar(@RequestBody ServletRequest request) throws MPException {
		Payment payment = new Payment();
		payment.setTransactionAmount(Float.valueOf(request.getParameter("transactionAmount")))
		.setToken(request.getParameter("token"))
		.setDescription(request.getParameter("description"))
		.setInstallments(Integer.valueOf(request.getParameter("installments")))
		.setPaymentMethodId(request.getParameter("paymentMethodId"));
		
		Identification identification = new Identification();
		identification.setType(request.getParameter("docType"))
		              .setNumber(request.getParameter("docNumber")); 
		
		Payer payer = new Payer();
		payer.setEmail(request.getParameter("email"))
		     .setIdentification(identification);

		payment.setPayer(payer);
		payment.save();
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(payment);
	}*/
}
