package com.betrybe.agrix.dto;

import java.time.LocalDate;

/**
 * Dto for crop.
 */
public record CropDto(Integer id, String name, Double plantedArea,
    LocalDate plantedDate, LocalDate harvestDate, Integer farmId) {

}