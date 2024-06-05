package com.betrybe.agrix.dto;

/**
 * Dto for crop.
 */
public record CropDto(Integer id, String name, Double plantedArea, Integer farmId) {

}