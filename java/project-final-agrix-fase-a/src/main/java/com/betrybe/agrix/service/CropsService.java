package com.betrybe.agrix.service;

import com.betrybe.agrix.dto.CropDto;
import com.betrybe.agrix.exception.NotFound;
import com.betrybe.agrix.models.entities.Crop;
import com.betrybe.agrix.models.repositories.CropRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * Service for class crops.
 */
@Service
public class CropsService {
  private final CropRepository cropRepository;

  @Autowired
  public CropsService(CropRepository cropRepository) {
    this.cropRepository = cropRepository;
  }

  /**
   * Service for get all crops.
   */
  public List<CropDto> getAllCrops() {
    List<Crop> crops = cropRepository.findAll();
    List<CropDto> listCropsDto = crops.stream()
          .map((crop -> new CropDto(
            crop.getId(),
            crop.getName(),
            crop.getPlantedArea(),
            crop.getFarm().getId()
        ))).collect(Collectors.toList());
    return listCropsDto;
  }

  /**
   * Service for get crop by id.
   */
  public CropDto getCropById(Integer id) {
    Optional<Crop> optionalCrop = cropRepository.findById(id);

    if (optionalCrop.isPresent()) {
      return new CropDto(
        optionalCrop.get().getId(),
        optionalCrop.get().getName(),
        optionalCrop.get().getPlantedArea(),
        optionalCrop.get().getFarm().getId()
        );
    }
    throw new NotFound("Plantação não encontrada!", HttpStatus.NOT_FOUND);
  }
}