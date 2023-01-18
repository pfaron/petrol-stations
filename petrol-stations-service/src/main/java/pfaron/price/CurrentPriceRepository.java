package pfaron.price;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CurrentPriceRepository extends CrudRepository<CurrentPrice, Long> {
    Optional<CurrentPrice> findByStationIdAndFuelType(Long stationId, FuelType fuelType);
}
