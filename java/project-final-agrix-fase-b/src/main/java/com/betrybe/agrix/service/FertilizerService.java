package com.betrybe.agrix.service;

import com.betrybe.agrix.dto.FertilizerDto;
import com.betrybe.agrix.exception.NotFound;
import com.betrybe.agrix.models.entities.Fertilizer;
import com.betrybe.agrix.models.repositories.FertilizerRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * Service for class fertilizer.
 */
@Service
public class FertilizerService {
  private final FertilizerRepository fertilizerRepository;

  @Autowired
  public FertilizerService(FertilizerRepository fertilizerRepository) {
    this.fertilizerRepository = fertilizerRepository;
  }

  /**
   * Service for new(post) fertilizer.
   */
  public FertilizerDto create(Fertilizer fertilizer) {
    Fertilizer newFertilizer = fertilizerRepository.save(fertilizer);
    FertilizerDto fertilizerDto = new FertilizerDto(
        newFertilizer.getId(),
        newFertilizer.getName(),
        newFertilizer.getBrand(),
        newFertilizer.getComposition()
    );
    return fertilizerDto;
  }

  /**
   * Service for getAll fertilizers.
   */
  public List<FertilizerDto> getAll() {
    List<Fertilizer> fertilizers = fertilizerRepository.findAll();
    List<FertilizerDto> fertilizerDtos = fertilizers.stream().map((fertlize -> new FertilizerDto(
        fertlize.getId(),
        fertlize.getName(),
        fertlize.getBrand(),
        fertlize.getComposition()
      ))).collect(Collectors.toList());
    return fertilizerDtos;
  }

  /**
   * Service for get fertilizer by id.
   */
  public FertilizerDto getById(Integer id) {
    Optional<Fertilizer> fertilizer = fertilizerRepository.findById(id);

    if (fertilizer.isPresent()) {
      FertilizerDto fertilizerDto = new FertilizerDto(
          fertilizer.get().getId(),
          fertilizer.get().getName(),
          fertilizer.get().getBrand(),
          fertilizer.get().getComposition());
      return fertilizerDto;
    }
    throw new NotFound("Fertilizante não encontrado!", HttpStatus.NOT_FOUND);
  }
}