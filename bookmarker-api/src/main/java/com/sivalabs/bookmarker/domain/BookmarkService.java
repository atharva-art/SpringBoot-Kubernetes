package com.sivalabs.bookmarker.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Transactional(readOnly = true)
    public BookMarksDTO getBookmarks(Integer page){
        int pageNo = page < 1 ? 0 : page-1;
        Pageable pageable =  PageRequest.of(pageNo, 10, Sort.Direction.DESC , "createdAt");
        Page<BookmarkDTO> bookMarkPage = bookmarkRepository.findBookmarks(pageable);
        return new BookMarksDTO(bookMarkPage);
    }

}
