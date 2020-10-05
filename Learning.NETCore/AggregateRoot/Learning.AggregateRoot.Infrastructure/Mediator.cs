﻿using System.Threading.Tasks;
using Learning.AggregateRoot.Domain.Interfaces;

namespace Learning.AggregateRoot.Infrastructure
{
    public class Mediator : IMediator
    {
        private readonly MediatR.IMediator _mediator;

        public Mediator(MediatR.IMediator mediator) => _mediator = mediator;

        public async Task SendCommand(ICommand command) => await _mediator.Send(command);

        public async Task PublishEvent(IEvent @event) => await _mediator.Publish(@event);
    }
}