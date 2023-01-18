package pfaron.api.v1;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pfaron.station.Station;
import pfaron.station.StationNoIdDto;
import pfaron.station.StationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/stations")
public class StationController {
    private final StationService stationService;

    @GetMapping
    @Operation(summary = "Gets a list of stations.")
    public ResponseEntity<List<Station>> getStations() {
        return ResponseEntity.ok(stationService.getStations());
    }

    @PostMapping("single-add")
    @Operation(summary = "Adds a new station.")
    public ResponseEntity<Void> addStation(@RequestBody StationNoIdDto stationNoIdDto) {
        stationService.addStation(stationNoIdDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("batch-add")
    @Operation(summary = "Adds a list of stations.")
    public ResponseEntity<Void> batchAddStations(@RequestBody List<StationNoIdDto> stations) {
        stationService.addStations(stations);
        return ResponseEntity.ok().build();
    }
}
