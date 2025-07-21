export default async function Home() {
  return (
    <>
      <h1>Chapter 9</h1>
      <h2>Conclusion</h2>

      <p>
        We have seen a couple different algorithms now for solving our problem.
        There are different tradeoffs to be made. As we saw it mostly comes down
        to the need for query time speed vs memory usage and resources we can
        muster to precompute some auxilliary datastructures.
      </p>

      <p>
        For my project I ended up choosing the Hub Label approach. While it is
        very performant, a very attractive property it has is that it can be
        implemented simply in SQL. We do not need a separate datastructure or
        service from where we would store our listings.
      </p>

      <p>Thank you for reading this blog post. I hope you enjoyed it!</p>
    </>
  );
}
