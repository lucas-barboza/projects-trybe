package com.betrybe.agrix.models.repositories;

import com.betrybe.agrix.models.entities.Crop;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interface Crop.
 */
public interface CropRepository extends JpaRepository<Crop, Integer> {
  List<Crop> findByharvestDateBetween(LocalDate start, LocalDate end);
}