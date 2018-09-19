package mk.chris.thebigscreen.repository;


import mk.chris.thebigscreen.domain.People;
import mk.chris.thebigscreen.domain.enumeration.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.LinkedHashSet;
import java.util.List;

@Repository
public class PeopleTempIds {

    JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource){
        jdbcTemplate = new JdbcTemplate(dataSource);
    }


    public LinkedHashSet<Integer> getIdsNotSaved(final List<Integer> ids){

        SingleConnectionDataSource scds = null;
        try {
            scds = new SingleConnectionDataSource(jdbcTemplate.getDataSource().getConnection(),true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        JdbcTemplate scdsJdbcTemplate = null;
        LinkedHashSet<Integer> notFoundIds;
        try {
            scdsJdbcTemplate = new JdbcTemplate(scds);

            scdsJdbcTemplate.execute("create local temporary table people_ids(id long)");
            scdsJdbcTemplate.batchUpdate("insert into people_ids(id) values(?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, ids.get(i).longValue());
                    }

                    @Override
                    public int getBatchSize() {
                        return ids.size();
                    }
                });
            notFoundIds = new LinkedHashSet<Integer>(scdsJdbcTemplate
                .<Integer>query("select id from people_ids " +
                        "where id not in (select id from people)",
                    new IdMapper()
                ));
        }finally {
            if (scdsJdbcTemplate != null) {
                scdsJdbcTemplate.execute("drop table if exists people_ids");
            }
            if (scds != null) {
                scds.destroy();
            }
        }
        return notFoundIds;
    }

    public LinkedHashSet<People> getPeopleByIds(final List<Integer> ids){

        SingleConnectionDataSource scds = null;
        try {
            scds = new SingleConnectionDataSource(jdbcTemplate.getDataSource().getConnection(),true);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        LinkedHashSet<People> peopleSet;
        JdbcTemplate scdsJdbcTemplate = null;
        try {
            scdsJdbcTemplate = new JdbcTemplate(scds);

            scdsJdbcTemplate.execute("create local temporary table people_ids(id long)");
            scdsJdbcTemplate.batchUpdate("insert into people_ids(id) values(?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, ids.get(i).longValue());
                    }

                    @Override
                    public int getBatchSize() {
                        return ids.size();
                    }
                });
            peopleSet = new LinkedHashSet<People>(scdsJdbcTemplate
                .query("select id, imdb_id, name, profile_path, popularity," +
                        "place_of_birth, biography, birthday, deathday, adult, gender " +
                        "from people " +
                        "where id in (select id from people_ids)",
                new PeopleMapper()
                ));
        }finally {

            if (scdsJdbcTemplate != null) {
                scdsJdbcTemplate.execute("drop table if exists people_ids");
            }
            if (scds != null) {
                scds.destroy();
            }
        }
        return peopleSet;
    }

    public class IdMapper implements RowMapper{
        @Override
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Math.toIntExact(rs.getLong(1));
        }
    }

    public class PeopleMapper implements RowMapper{
        @Override
        public People mapRow(ResultSet rs, int rowNum) throws SQLException {
            People person = new People();
            person.setId(rs.getLong(1));
            person.setImdbId(rs.getString(2));
            person.setName(rs.getString(3));
            person.setProfilePath(rs.getString(4));
            person.setPopularity(rs.getFloat(5));
            person.setPlaceOfBirth(rs.getString(6));

            Clob clob = rs.getClob(7);
            person.setBiography(clob != null? clob.getSubString(1,(int)clob.length()) : null);

            Date birthday = rs.getDate(8);
            person.setBirthday(birthday != null? birthday.toLocalDate() : null);

            Date deathday = rs.getDate(9);
            person.setDeathday(deathday != null? deathday.toLocalDate() : null);

            person.setAdult(rs.getBoolean(10));

            String gender = rs.getString(11);
            person.setGender(Gender.valueOf(gender));

            return person;
        }
    }
}
