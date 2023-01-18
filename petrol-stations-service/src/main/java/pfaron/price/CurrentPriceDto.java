package pfaron.price;

import lombok.*;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = false)
@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
public class CurrentPriceDto {
    private long stationId;
    private FuelType fuelType;
    private BigDecimal price;
    private Currency currency;
    private long priceRecordId;

    public static CurrentPriceDto fromCurrentPrice(CurrentPrice currentPrice) {
        return CurrentPriceDto.builder()
                .stationId(currentPrice.getStation().getId())
                .fuelType(currentPrice.getFuelType())
                .price(currentPrice.getPrice().getAmount())
                .currency(currentPrice.getPrice().getCurrency())
                .priceRecordId(currentPrice.getPriceRecord().getId())
                .build();
    }
}
