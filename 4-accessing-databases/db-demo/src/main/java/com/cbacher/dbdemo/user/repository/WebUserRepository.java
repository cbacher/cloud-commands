package com.cbacher.dbdemo.user.repository;

import com.cbacher.dbdemo.user.model.WebUser;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface WebUserRepository extends PagingAndSortingRepository<WebUser, Long> {
    List<WebUser> findByName(@Param("name") String name);
}
