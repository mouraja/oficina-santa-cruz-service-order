/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.oficina.service.service;

import br.com.oficina.service.repository.ServiceOrderRepository;
import br.com.oficina.service.entity.ServiceOrderEntity;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 *
 * @author moura
 */
@Service

@RequiredArgsConstructor
public class ServiceOrderService {

    private final ServiceOrderRepository repository;
    
    public List<ServiceOrderEntity> findAll() {
        return repository.findAll();
    }
    
    public Optional<ServiceOrderEntity> findById(Long id){
        return repository.findById(id);
    }

    public ServiceOrderEntity save(ServiceOrderEntity serviceOrder){
        return repository.save(serviceOrder);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
    
}
