select USER.USER_ID,name from USER join POST on POST.USER_ID=USER.USER_ID group by POST.USER_ID having count(*) > 3; 