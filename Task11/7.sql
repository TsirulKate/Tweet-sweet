select datediff(current_date(),POST.CREATED_AT) from POST order by CREATED_AT limit 1;
select max(datediff(current_date(),POST.CREATED_AT)) from POST;