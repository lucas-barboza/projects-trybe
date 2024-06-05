package com.betrybe.agrix.service;

import com.betrybe.agrix.dto.CropDto;
import com.betrybe.agrix.dto.FertilizerDto;
import com.betrybe.agrix.exception.NotFound;
import com.betrybe.agrix.models.entities.Crop;
import com.betrybe.agrix.models.entities.Fertilizer;
import com.betrybe.agrix.models.repositories.CropRepository;
import com.betrybe.agrix.models.repositories.FertilizerRepository;
import java.time.LocalDate;
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
  private final FertilizerRepository fertilizerRepository;

  @Autowired
  public CropsService(CropRepository cropRepository, FertilizerRepository fertilizerRepository) {
    this.cropRepository = cropRepository;
    this.fertilizerRepository = fertilizerRepository;
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
            crop.getPlantedDate(),
            crop.getHarvestDate(),
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
        optionalCrop.get().getPlantedDate(),
        optionalCrop.get().getHarvestDate(),
        optionalCrop.get().getFarm().getId()
        );
    }
    throw new NotFound("Plantação não encontrada!", HttpStatus.NOT_FOUND);
  }

  /**
   * Service for search crop date.
   */
  public List<CropDto> getSearchCropsBetweenDates(LocalDate start, LocalDate end) {
    List<Crop> crops = cropRepository.findByharvestDateBetween(start, end);
    List<CropDto> cropsDto = crops.stream()
        .map((crop -> new CropDto(
            crop.getId(),
            crop.getName(),
            crop.getPlantedArea(),
            crop.getPlantedDate(),
            crop.getHarvestDate(),
            crop.getFarm().getId()
        ))).collect(Collectors.toList());
    return cropsDto;
  }

  /**
   * Service for associate crop and fertilizer.
   */
  public String associateFertilizerCrop(Integer cropId, Integer fertilizerId) {
    Optional<Crop> cropOptional = cropRepository.findById(cropId);
    if (!cropOptional.isPresent()) {
      throw new NotFound("Plantação não encontrada!", HttpStatus.NOT_FOUND);
    }

    Optional<Fertilizer> fertilizerOptional = fertilizerRepository.findById(fertilizerId);
    if (!fertilizerOptional.isPresent()) {
      throw new NotFound("Fertilizante não encontrado!", HttpStatus.NOT_FOUND);
    }

    Crop crop = cropOptional.get();
    Fertilizer fertilizer = fertilizerOptional.get();
    crop.getFertilizer().add(fertilizer);
    fertilizer.getCrops().add(crop);
    fertilizerRepository.save(fertilizer);
    cropRepository.save(crop);
    return "Fertilizante e plantação associados com sucesso!";
  }

  /**
   * Service for get crops associates a fertlizers.
   */
  public List<FertilizerDto> getCropFertilizersById(Integer id) {
    Optional<Crop> cropOptional = cropRepository.findById(id);
    if (!cropOptional.isPresent()) {
      throw new NotFound("Plantação não encontrada!", HttpStatus.NOT_FOUND);
    }

    Crop crops = cropOptional.get();
    List<FertilizerDto> fertilizerDtos = crops.getFertilizer().stream()
        .map((fertilizer -> new FertilizerDto(
          fertilizer.getId(),
          fertilizer.getName(),
          fertilizer.getBrand(),
          fertilizer.getComposition()
        ))).collect(Collectors.toList());
    return fertilizerDtos;
  }
}