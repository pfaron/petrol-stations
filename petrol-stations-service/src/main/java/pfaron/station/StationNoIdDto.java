package pfaron.station;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@EqualsAndHashCode
@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
public class StationNoIdDto {
    private String brand;
    private String name;
    private String address;
    private float latitude;
    private float longitude;
}
