package pfaron.api.v1;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pfaron.price.CurrentPriceDto;
import pfaron.price.NewPriceRecordDto;
import pfaron.price.PriceRecordDto;
import pfaron.price.PriceService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/prices")
public class PriceController {
    private final PriceService priceService;

    @PostMapping("/set")
    @Operation(summary = "Sets a price for given station and type of fuel")
    public ResponseEntity<Void> setPrice(@RequestBody CurrentPriceDto currentPriceDto) {
        priceService.setCurrentPrice(currentPriceDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add")
    @Operation(summary = "Adds a new price record for given station and type of fuel")
    public ResponseEntity<Void> addPrice(@RequestBody NewPriceRecordDto newPriceRecordDto) {
        priceService.savePriceRecord(newPriceRecordDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/batch-add")
    @Operation(summary = "Adds a list of price records.")
    public ResponseEntity<Void> addPriceRecords(@RequestBody List<NewPriceRecordDto> priceRecordDtos) {
        priceService.savePriceRecords(priceRecordDtos);
        return ResponseEntity.ok().build();
    }

    @PostMapping("{id}/upvote")
    @Operation(summary = "Up-votes a given price record.")
    public ResponseEntity<Void> upVotePrice(@PathVariable long id) {
        priceService.incrementUpVotes(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("{id}/downvote")
    @Operation(summary = "Down-votes a given price record.")
    public ResponseEntity<Void> downVotePrice(@PathVariable long id) {
        priceService.incrementDownVotes(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "Gets all current prices.")
    public ResponseEntity<List<CurrentPriceDto>> getCurrentPrices() {
        return ResponseEntity.ok(priceService.getCurrentPrices());
    }

    @GetMapping("{id}")
    @Operation(summary = "Gets all price records for given station.")
    public ResponseEntity<List<PriceRecordDto>> getPriceRecordsForStation(@PathVariable long id) {
        return ResponseEntity.ok(priceService.getPriceRecordsForStation(id));
    }
}
