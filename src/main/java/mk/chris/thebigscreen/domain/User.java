package mk.chris.thebigscreen.domain;

import mk.chris.thebigscreen.config.Constants;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.time.Instant;

/**
 * A user.
 */
@Entity
@Table(name = "jhi_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class User extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 100)
    @Column(length = 100, unique = true, nullable = false)
    private String login;

    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60)
    private String password;

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    @Column(length = 100, unique = true)
    private String email;

    @NotNull
    @Column(nullable = false)
    private boolean activated = false;

    @Size(min = 2, max = 6)
    @Column(name = "lang_key", length = 6)
    private String langKey;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate = null;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BookmarkedMovie> bookmarkedMovies = new HashSet<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WatchedMovie> watchedMovies = new HashSet<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RatedMovie> ratedMovies = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "jhi_user_authority",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();

//    @ManyToMany
//    @JoinTable(
//        name = "followers",
//        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
//        inverseJoinColumns = {@JoinColumn(name = "follower_id", referencedColumnName = "id")})
//    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//    @BatchSize(size = 20)
//    private Set<User> followers = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    // Lowercase the login before saving it in database
    public void setLogin(String login) {
        this.login = StringUtils.lowerCase(login, Locale.ENGLISH);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean getActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public Instant getResetDate() {
        return resetDate;
    }

    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public boolean isActivated() {
        return activated;
    }

    public Set<BookmarkedMovie> getBookmarkedMovies() {
        return bookmarkedMovies;
    }

    public void setBookmarkedMovies(Set<BookmarkedMovie> bookmarkedMovies) {
        this.bookmarkedMovies = bookmarkedMovies;
    }


    public User bookmarkedMovies(Set<BookmarkedMovie> bookmarkedMovies) {
        this.bookmarkedMovies = bookmarkedMovies;
        return this;
    }

    public User addBookmarkedMovies(BookmarkedMovie bookmarkedMovie) {
        this.bookmarkedMovies.add(bookmarkedMovie);
        bookmarkedMovie.setUser(this);
        return this;
    }

    public User removeBookmarkedMovies(BookmarkedMovie bookmarkedMovie) {
        this.bookmarkedMovies.remove(bookmarkedMovie);
        bookmarkedMovie.setUser(null);
        return this;
    }


    public Set<WatchedMovie> getWatchedMovies() {
        return watchedMovies;
    }

    public void setWatchedMovies(Set<WatchedMovie> watchedMovies) {
        this.watchedMovies = watchedMovies;
    }


    public User watchedMovies(Set<WatchedMovie> watchedMovies) {
        this.watchedMovies = watchedMovies;
        return this;
    }

    public User addWatchedMovies(WatchedMovie watchedMovie) {
        this.watchedMovies.add(watchedMovie);
        watchedMovie.setUser(this);
        return this;
    }

    public User removeWatchedMovies(WatchedMovie watchedMovie) {
        this.watchedMovies.remove(watchedMovie);
        watchedMovie.setUser(null);
        return this;
    }


    public Set<RatedMovie> getRatedMovies() {
        return ratedMovies;
    }

    public void setRatedMovies(Set<RatedMovie> ratedMovies) {
        this.ratedMovies = ratedMovies;
    }

    public User ratedMovies(Set<RatedMovie> ratedMovies) {
        this.ratedMovies = ratedMovies;
        return this;
    }

    public User addRatedMovies(RatedMovie ratedMovie) {
        this.ratedMovies.add(ratedMovie);
        ratedMovie.setUser(this);
        return this;
    }

    public User removeRatedMovies(RatedMovie ratedMovie) {
        this.ratedMovies.remove(ratedMovie);
        ratedMovie.setUser(null);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;
        return !(user.getId() == null || getId() == null) && Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "User{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated='" + activated + '\'' +
            ", langKey='" + langKey + '\'' +
            ", activationKey='" + activationKey + '\'' +
            "}";
    }
}
