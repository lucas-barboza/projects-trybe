package com.betrybe.agrix.models.repositories;

import com.betrybe.agrix.models.entities.Fertilizer;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interface Fertilizer.
 */
public interface FertilizerRepository extends JpaRepository<Fertilizer, Integer> {

}