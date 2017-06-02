create table videos(
  id int references users(id),
  videoId int,
  video varchar(1000)
);