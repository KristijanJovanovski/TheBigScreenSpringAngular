//package mk.chris.thebigscreen.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
//import org.springframework.data.repository.NoRepositoryBean;
//
//import java.io.Serializable;
//import java.util.List;
//
//@NoRepositoryBean
//public interface BulkSaveRepository<T, ID extends Serializable> extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {
//
//    <S extends T> List<S> saveInBulk(Iterable<S> entities);
//}
