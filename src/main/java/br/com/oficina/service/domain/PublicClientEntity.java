/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.oficina.service.domain;

import br.com.oficina.utils.CommonAudityAttributeEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author moura
 */
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PublicClientEntity
    extends CommonAudityAttributeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String publicName;

    @Column(nullable = false)
    private String publicFantasyName;

    @Column(nullable = true)
    private String addressDelivery;

    @Column(nullable = true)
    private String addressBilling;

    @Column(nullable = true)
    private String primaryContact;

    @Column(nullable = true)
    private String primaryEmail;

    @Column(nullable = true)
    private String primaryPhoneNumber;

    @Column(nullable = true)
    private String primarySupportContact;

    @Column(nullable = true)
    private String observation;

/*    
    @OneToMany(
            targetEntity = VehicleEntity.class,
            mappedBy = "clientOwner",
            fetch = FetchType.LAZY)
    private List<VehicleEntity> vehicles;

    @OneToMany(
            targetEntity = PublicClientAgentEntity.class,
            mappedBy = "publicClient",
            fetch = FetchType.EAGER)
    private List<PublicClientAgentEntity> publicClientAgents;
    
    @OneToMany(
            targetEntity = ServiceOrderEntity.class,
            mappedBy = "entryDriver",
            fetch = FetchType.EAGER)
    private List<ServiceOrderEntity> drivers;    
    
    @OneToMany(
            targetEntity = ServiceOrderEntity.class,
            mappedBy = "controller",
            fetch = FetchType.EAGER)
    private List<ServiceOrderEntity> controllers;
*/

}
