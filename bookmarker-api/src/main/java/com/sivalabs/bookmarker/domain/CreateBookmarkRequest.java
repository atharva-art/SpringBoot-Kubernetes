package com.sivalabs.bookmarker.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateBookmarkRequest {
    @NotEmpty(message = "Title should not be null")
    private String title;

    @NotEmpty(message = "Url should not be null")
    private String url;
}
