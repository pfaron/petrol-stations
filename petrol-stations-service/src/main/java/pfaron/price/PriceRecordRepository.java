package pfaron.price;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PriceRecordRepository extends CrudRepository<PriceRecord, Long> {
    @Modifying
    @Query(value = "UPDATE PriceRecord p set p.upVotes = p.upVotes + 1 WHERE p.id = :id")
    @Transactional
    void incrementUpVotesForId(Long id);

    @Modifying
    @Query(value = "UPDATE PriceRecord p set p.downVotes = p.downVotes + 1 WHERE p.id = :id")
    @Transactional
    void incrementDownVotesForId(Long id);

    List<PriceRecord> findAllByStationId(Long id);
}
