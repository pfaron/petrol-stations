package pfaron.station;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.StreamSupport.stream;

@Service
@RequiredArgsConstructor
public class StationService {
    private final StationRepository stationRepository;

    public List<Station> getStations() {
        return stream(stationRepository.findAll().spliterator(), false).toList();
    }

    public void addStation(StationNoIdDto stationNoIdDto) {
        stationRepository.save(Station.from(stationNoIdDto));
    }

    public void addStations(List<StationNoIdDto> stations) {
        stationRepository.saveAll(stations.stream().map(Station::from).toList());
    }
}
