package pfaron.price;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pfaron.station.Station;
import pfaron.station.StationRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static java.util.stream.StreamSupport.stream;

@Service
@RequiredArgsConstructor
public class PriceService {
    private final CurrentPriceRepository currentPriceRepository;
    private final PriceRecordRepository priceRecordRepository;
    private final StationRepository stationRepository;

    public void setCurrentPrice(CurrentPriceDto currentPriceDto) {
        Station station = stationRepository.findById(currentPriceDto.getStationId()).orElseThrow(RuntimeException::new);
        CurrentPrice currentPrice = CurrentPrice.builder()
                .station(station)
                .price(Price.builder()
                        .amount(currentPriceDto.getPrice())
                        .currency(currentPriceDto.getCurrency())
                        .build())
                .fuelType(currentPriceDto.getFuelType())
                .build();
        currentPriceRepository.save(currentPrice);
    }

    public void savePriceRecords(List<NewPriceRecordDto> newPriceRecordDtos) {
        newPriceRecordDtos.forEach(this::savePriceRecord);
    }

    public void savePriceRecord(NewPriceRecordDto newPriceRecordDto) {
        System.out.println(newPriceRecordDto);

        Station station = stationRepository.findById(newPriceRecordDto.getStationId()).orElseThrow(RuntimeException::new);

        PriceRecord priceRecord = PriceRecord.builder()
                .station(station)
                .addedDate(newPriceRecordDto.getAddedDate() == null ? LocalDateTime.now() : newPriceRecordDto.getAddedDate())
                .price(Price.builder()
                        .amount(newPriceRecordDto.getPrice())
                        .currency(newPriceRecordDto.getCurrency())
                        .build())
                .fuelType(newPriceRecordDto.getFuelType())
                .upVotes(0L)
                .downVotes(0L)
                .build();
        priceRecordRepository.save(priceRecord);

        Optional<CurrentPrice> previousPrice = currentPriceRepository.findByStationIdAndFuelType(station.getId(), priceRecord.getFuelType());

        CurrentPrice currentPrice;
        if (previousPrice.isPresent()) {
            currentPrice = previousPrice.get();
            currentPrice.setPrice(Price.builder()
                    .amount(newPriceRecordDto.getPrice())
                    .currency(newPriceRecordDto.getCurrency())
                    .build());
            currentPrice.setPriceRecord(priceRecord);
        } else {
            currentPrice = CurrentPrice.builder()
                    .station(station)
                    .price(Price.builder()
                            .amount(newPriceRecordDto.getPrice())
                            .currency(newPriceRecordDto.getCurrency())
                            .build())
                    .fuelType(newPriceRecordDto.getFuelType())
                    .priceRecord(priceRecord)
                    .build();
        }
        currentPriceRepository.save(currentPrice);
    }

    public void incrementUpVotes(long id) {
        priceRecordRepository.incrementUpVotesForId(id);
    }

    public void incrementDownVotes(long id) {
        priceRecordRepository.incrementDownVotesForId(id);
    }

    public List<CurrentPriceDto> getCurrentPrices() {
        return stream(currentPriceRepository.findAll().spliterator(), false)
                .map(CurrentPriceDto::fromCurrentPrice)
                .toList();
    }

    public List<PriceRecordDto> getPriceRecordsForStation(long id) {
        return priceRecordRepository.findAllByStationId(id)
                .stream()
                .map(PriceRecordDto::fromPriceRecord)
                .toList();
    }
}
