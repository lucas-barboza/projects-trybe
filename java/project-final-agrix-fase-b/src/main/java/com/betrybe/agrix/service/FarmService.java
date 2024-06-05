package com.betrybe.agrix.service;

import com.betrybe.agrix.exception.NotFound;
import com.betrybe.agrix.models.entities.Crop;
import com.betrybe.agrix.models.entities.Farm;
import com.betrybe.agrix.models.repositories.CropRepository;
import com.betrybe.agrix.models.repositories.FarmRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * Service for class farm.
 */
@Service
public class FarmService {
  private final FarmRepository farmRepository;
  private final CropRepository cropRepository;

  @Autowired
  public FarmService(FarmRepository farmRepository, CropRepository cropRepository) {
    this.farmRepository = farmRepository;
    this.cropRepository = cropRepository;
  }

  public Farm createFarm(Farm farm) {
    return farmRepository.save(farm);
  }

  public List<Farm> getAllFarms() {
    return farmRepository.findAll();
  }

  /**
   * Service for get farm by id.
   */
  public Farm getFarmById(Integer id) {
    Optional<Farm> optionalFarm = farmRepository.findById(id);

    if (optionalFarm.isPresent()) {
      Farm farm = optionalFarm.get();
      return farmRepository.save(farm);
    }
    throw new NotFound("Fazenda não encontrada!", HttpStatus.NOT_FOUND);
  }

  /**
   * Service for new Crop.
   */
  public Crop createCrop(Integer id, Crop crop) {
    Optional<Farm> optionalFarm = farmRepository.findById(id);

    if (optionalFarm.isPresent()) {
      Farm farm = optionalFarm.get();
      crop.setFarm(farm);
      return cropRepository.save(crop);
    }
    throw new NotFound("Fazenda não encontrada!", HttpStatus.NOT_FOUND);
  }

  /**
   * Service for get crop for farm ID.
   */
  public List<Crop> getCropForFarmId(Integer id) {
    Optional<Farm> optionalFarm = farmRepository.findById(id);

    if (optionalFarm.isPresent()) {
      Farm farm = optionalFarm.get();
      return farm.getCrops();
    }
    throw new NotFound("Fazenda não encontrada!", HttpStatus.NOT_FOUND);
  }
}