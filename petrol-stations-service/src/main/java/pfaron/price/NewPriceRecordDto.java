package pfaron.price;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = false)
@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
public class NewPriceRecordDto {
    private long stationId;
    private FuelType fuelType;
    private BigDecimal price;
    private Currency currency;
    private LocalDateTime addedDate;
}
