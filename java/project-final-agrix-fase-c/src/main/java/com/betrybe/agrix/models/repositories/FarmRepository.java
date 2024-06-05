package com.betrybe.agrix.models.repositories;

import com.betrybe.agrix.models.entities.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interface Crop.
 */
public interface FarmRepository extends JpaRepository<Farm, Integer> {

}