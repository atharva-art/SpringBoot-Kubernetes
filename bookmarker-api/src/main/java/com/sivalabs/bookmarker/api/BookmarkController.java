package com.sivalabs.bookmarker.api;

import com.sivalabs.bookmarker.domain.BookMarksDTO;
import com.sivalabs.bookmarker.domain.Bookmark;
import com.sivalabs.bookmarker.domain.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bookmark")
public class BookmarkController {
    @Autowired
    private BookmarkService bookmarkService;

    @GetMapping
    public BookMarksDTO getBookMarks(@RequestParam(name = "page", defaultValue = "1") Integer page){
        return bookmarkService.getBookmarks(page);
    }

}
