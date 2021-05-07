package com.certMP.TiendaEcommerce.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.certMP.TiendaEcommerce.entity.Producto;
import com.certMP.TiendaEcommerce.repository.ProductoRepository;

@Service
public class ProductoService {
	
	@Autowired
	private ProductoRepository productoRepository;

	public Iterable<Producto> findAll() {
		return productoRepository.findAll();
	}
	
	public Optional<Producto> findById(Long id) {
		return productoRepository.findById(id);
	}
	
	public Producto save(Producto producto) {
		return productoRepository.save(producto);
	}
	
	public void deleteById(Long id) {
		productoRepository.deleteById(id);
	}
	
}
