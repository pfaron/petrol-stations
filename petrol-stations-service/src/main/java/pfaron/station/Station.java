package pfaron.station;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand;
    private String name;
    private String address;
    private Float latitude;
    private Float longitude;

    public static Station from(StationNoIdDto stationNoIdDto) {
        return Station.builder()
                .brand(stationNoIdDto.getBrand())
                .name(stationNoIdDto.getName())
                .address(stationNoIdDto.getAddress())
                .latitude(stationNoIdDto.getLatitude())
                .longitude(stationNoIdDto.getLongitude())
                .build();
    }
}
