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
public class PriceRecordDto {
    private Long id;
    private Long stationId;
    private LocalDateTime addedDate;
    private FuelType fuelType;
    private BigDecimal price;
    private Currency currency;
    private Long upVotes;
    private Long downVotes;

    public static PriceRecordDto fromPriceRecord(PriceRecord priceRecord) {
        return PriceRecordDto.builder()
                .id(priceRecord.getId())
                .stationId(priceRecord.getStation().getId())
                .addedDate(priceRecord.getAddedDate())
                .fuelType(priceRecord.getFuelType())
                .price(priceRecord.getPrice().getAmount())
                .currency(priceRecord.getPrice().getCurrency())
                .upVotes(priceRecord.getUpVotes())
                .downVotes(priceRecord.getDownVotes())
                .build();
    }
}
